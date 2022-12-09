import { BrowserWindow } from 'electron'
import { resolveHtmlPath } from '@/main/utils/path'
import { assetsPath } from '@/constant/icon'
import initPrint from '@/main/ipc/print'

let printWindow: BrowserWindow | null

export async function createPrintWindow() {
   printWindow = new BrowserWindow({
    show: false, // 为了让初始化窗口显示无闪烁，先关闭显示，等待加载完成后再显示。
    width: 1024,
    height: 728,
    icon: assetsPath('icon.png'),
    webPreferences: {
      webviewTag: true, // 启用 webview 标签功能
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  await initPrint()

  await printWindow.loadURL(resolveHtmlPath('index.html', 'printer-layout/print'))
  printWindow.show()
}

export const getPrintWindow = () => printWindow
