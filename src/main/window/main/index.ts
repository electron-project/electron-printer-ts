import { app, BrowserWindow } from 'electron'
import path from 'path'
import { resolveHtmlPath } from '@/main/utils/path'
import { initEvent } from '@/main/window/main/event'
import createMenu from '@/main/window/main/menu'
import initElectronRemote from '@/main/utils/plugin/electron-remote'
import * as process from 'process'
import '@/main/window/app/url-scheme'
import { ElectronPath } from '@/main/constant/path'

let mainWindow: BrowserWindow | null

export const createMainWindow = async () => {
  if (mainWindow) return

  mainWindow = new BrowserWindow({
    show: false, // 为了让初始化窗口显示无闪烁，先关闭显示，等待加载完成后再显示。
    width: 1024,
    height: 728,
    icon: ElectronPath.icon,
    //! titleBarStyle 设置为 hidden 后搭配 titleBarOverlay 设置为 true 或者自定义颜色可以像 Vscode 一样使用放大缩小控件
    titleBarStyle: 'hidden',
    titleBarOverlay: { color: '#eeeeee', symbolColor: '#000000', height: 35 },
    webPreferences: {
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(process.cwd(), '.erb/dll/preload.js'),
    },
  })

  initEvent()
  await initElectronRemote(mainWindow)

  createMenu()

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
