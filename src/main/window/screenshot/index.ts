import path from 'path'
import { app, BrowserWindow, screen } from 'electron'
import { resolveHtmlPath } from '@/main/utils/path'
import process from 'process'
import platform from '@/main/constant/platform'

let cutWindows: BrowserWindow[] = []

export async function createScreenShotWindows() {
  const displays = screen.getAllDisplays() // 返回可用窗口数组

  cutWindows = displays.map((display) => {
    const cutWindow = new BrowserWindow({
      width: display.bounds.width,
      height: display.bounds.height,

      // window 使用 fullscreen,  mac 设置为 undefined, 不可为 false
      fullscreen: platform.isWindows || undefined, // win
      // fullscreenable: true,
      // simpleFullscreen: true,

      x: display.bounds.x,
      y: display.bounds.y,
      transparent: true,
      frame: false, // frame 开启时添加这个 -webkit-app-region: no-drag; 才能触发点击事件
      skipTaskbar: true,
      autoHideMenuBar: true,
      movable: false,
      resizable: false,
      enableLargerThanScreen: true, // mac
      hasShadow: false,

      useContentSize: true,
      alwaysOnTop: true,

      webPreferences: {
        preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(process.cwd(), '.erb/dll/preload.js'),
      },
    })

    let { x, y } = screen.getCursorScreenPoint() // 获取鼠标绝对位置
    if (
      x >= display.bounds.x &&
      x <= display.bounds.x + display.bounds.width &&
      y >= display.bounds.y &&
      y <= display.bounds.y + display.bounds.height
    ) {
      cutWindow.focus()
    } else {
      cutWindow.blur()
    }

    cutWindow.setAlwaysOnTop(true, 'screen-saver') // mac
    cutWindow.setVisibleOnAllWorkspaces(true) // mac 设置窗口是否应在所有工作区中可见
    cutWindow.setFullScreenable(true) // mac 设置最大化/缩放窗口按钮是切换全屏模式还是最大化窗口

    cutWindow.maximize()
    cutWindow.setFullScreen(true)

    cutWindow.loadURL(resolveHtmlPath('index.html', 'screenshot-layout/virtual')).then(() => {
      cutWindow.webContents.closeDevTools() // 想要关闭需要等待 loadURL 函数执行完毕
    })

    cutWindow.on('close', () => {
      let index = cutWindows?.indexOf(cutWindow)
      if (index !== -1) {
        cutWindows?.splice(index, 1)
      }

      cutWindows = []
      // cutWindows?.forEach((win: BrowserWindow) => win.close())
    })

    return cutWindow
  })
}

export const getScreenShotWindows = () => cutWindows
