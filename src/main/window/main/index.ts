import { app, BrowserWindow } from 'electron'
import path from 'path'
import AppUpdater from '@/main/utils/plugin/auto-update'
import { resolveHtmlPath } from '@/main/utils/path'
import { assetsPath } from '@/constant/icon'
import { initEvent } from '@/main/window/main/event'
import initTray from '@/main/window/main/tray'
import createMenu from '@/main/window/main/menu'
import initElectronRemote from '@/main/utils/plugin/electron-remote'
import * as process from 'process'
import initPrint from '@/main/ipc/print'
import '@/main/window/app/url-scheme'

let mainWindow: BrowserWindow | null

export const createMainWindow = async () => {
  if (mainWindow) return

  mainWindow = new BrowserWindow({
    show: false, // 为了让初始化窗口显示无闪烁，先关闭显示，等待加载完成后再显示。
    width: 1024,
    height: 728,
    icon: assetsPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(process.cwd(), '.erb/dll/preload.js'),
    },
  })

  initEvent()
  await initElectronRemote(mainWindow)

  initTray()
  createMenu()

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  AppUpdater().then()

  initPrint()

  // 设置为最顶层
  // win.setAlwaysOnTop(true)
  // 可以让主进程打开文件或者一个链接;
  // win.loadURL(`www.baidu.com`)
  await mainWindow.loadURL(resolveHtmlPath('index.html', 'main'))

  mainWindow.show()
}

export function closeMainWindow(option: { force: boolean; hidden?: boolean } = { force: false }) {
  mainWindow = null
}

export const getMainWindow = () => mainWindow
