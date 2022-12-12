import { app, BrowserWindow } from 'electron'
import path from 'path'
import { isDev } from '@/constant/env'
import installExtensions from '@/main/utils/plugin/extensions'
import AppUpdater from '@/main/utils/plugin/auto-update'
import { resolveHtmlPath } from '@/main/utils/path'
import { assetsPath } from '@/constant/icon'
import { initEvent } from '@/main/window/main/event'
import initTray from '@/main/window/main/tray'
import createMenu from '@/main/window/main/menu'
import initElectronRemote from '@/main/window/main/electron-remote'
import { regGlobalShortcut } from '@/main/window/main/global-shortcut'
import * as process from 'process'
import { checkSchemeSetup, registerLink } from '@/main/window/app/url-scheme'
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

  // objc[85955]: Class WebSwapCGLLayer is implemented in both xxxxx One of the two will be used. Which one is undefined.
  // Failed to fetch extension, trying 4 more times
  // 是因为安装开发者工具 没有外网
  // 必须在 loadURL 之前进行安装
  // if (isDev) await installExtensions();

  initEvent()
  await initElectronRemote()

  initTray()
  createMenu()
  regGlobalShortcut()

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
  if (option.force) {
    mainWindow = null
    return
  }

  if (option.hidden) {
    mainWindow?.close()
  }
}

export const getMainWindow = () => mainWindow
