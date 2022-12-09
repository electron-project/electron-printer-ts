import { app, BrowserWindow } from 'electron';
import { resolveHtmlPath } from '@/main/utils/path'
import { assetsPath } from '@/constant/icon'
import initPrint from '@/main/ipc/print'
import path from 'path';
import process from 'process';

let printSetting: BrowserWindow | null

export async function createPrintSetting() {
  printSetting = new BrowserWindow({
    show: false, // 为了让初始化窗口显示无闪烁，先关闭显示，等待加载完成后再显示。
    width: 1024,
    height: 728,
    icon: assetsPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(process.cwd(), '.erb/dll/preload.js'),
    },
  })

  await initPrint()

  await printSetting.loadURL(resolveHtmlPath('index.html', 'printer-layout/setting'))
  printSetting.show()
}

export const getPrintSetting = () => printSetting
