import { BrowserWindow, Menu } from 'electron'
import { resolveHtmlPath } from '@/main/utils/path'
import { assetsPath } from '@/constant/icon'
import initPrintIPC from '@/main/ipc/print'
import { checkSchemeSetup, registerLink } from '@/main/window/app/url-scheme'
import { initPrintEvent } from '@/main/window/print/event'

let printWindow: BrowserWindow | null

export async function createPrintWindow() {
  printWindow = new BrowserWindow({
    show: false, // 为了让初始化窗口显示无闪烁，先关闭显示，等待加载完成后再显示。
    width: 480,
    height: 342,
    resizable: false,
    icon: assetsPath('icons/icon.png'),
    webPreferences: {
      webviewTag: true, // 启用 webview 标签功能
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  Menu.setApplicationMenu(null)

  registerLink()
  checkSchemeSetup()
  initPrintEvent()

  await initPrintIPC()

  await printWindow.loadURL(resolveHtmlPath('index.html', 'printer-layout/print'))

  printWindow.show()
}

export const closePrintWindow = () => {
  printWindow = null
}

export const getPrintWindow = () => printWindow
