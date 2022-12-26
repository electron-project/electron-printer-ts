import { app, BrowserWindow } from 'electron'
import { resolveHtmlPath } from '@/main/utils/path'
import path from 'path'
import process from 'process'
import { initPrintSettingEvent } from '@/main/window/print-setting/event'
import initPrintIPC from '@/main/ipc/print'
import { ElectronPath } from '@/main/constant/path'

let printSetting: BrowserWindow | null

export async function createPrintSetting() {
  printSetting = new BrowserWindow({
    show: false, // 为了让初始化窗口显示无闪烁，先关闭显示，等待加载完成后再显示。
    width: 480,
    height: 342,
    icon: ElectronPath.icon,
    webPreferences: {
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(process.cwd(), '.erb/dll/preload.js')
    }
  })

  initPrintSettingEvent()
  await initPrintIPC()

  await printSetting.loadURL(resolveHtmlPath('index.html', 'printer-layout/setting'))
  printSetting.show()
}

export const getPrintSetting = () => printSetting
export const closePrintSetting = () => {
  printSetting = null
}
