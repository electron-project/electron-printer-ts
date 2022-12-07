import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { PrinterChannels, WebViewSetHtml } from '@/typings/channel'

// 需要在这里定义暴露给 ipcRender 的函数，然后在 ipcRender 的 preload.d.ts 中定义类型
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel: string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args)
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args))
    },

    getPrinterList(channel: PrinterChannels) {
      ipcRenderer.send(channel)
    },
    sendSetHtml(channel: WebViewSetHtml, arg: object) {
      ipcRenderer.send(channel, arg)
    },
  },
})
