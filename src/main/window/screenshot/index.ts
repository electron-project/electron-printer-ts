import path from 'path'
import { getSize } from '@/main/utils/size'
import { app, BrowserWindow } from 'electron'
import { resolveHtmlPath } from '@/main/utils/path'
import process from 'process'

let cutWindow: BrowserWindow | null

export async function createScreenShotWindow() {
  const { width, height } = getSize()
  cutWindow = new BrowserWindow({
    width,
    height,
    autoHideMenuBar: true,
    useContentSize: true,
    movable: false,
    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    fullscreenable: true,
    fullscreen: true,
    simpleFullscreen: true,
    alwaysOnTop: false,
    webPreferences: {
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(process.cwd(), '.erb/dll/preload.js'),
    },
  })

  await cutWindow.loadURL(resolveHtmlPath('index.html', 'screenshot'))

  cutWindow.maximize()
  cutWindow.setFullScreen(true)
}

export function closeScreenShotWindow() {
  cutWindow?.close()
  cutWindow = null
}

export const getScreenShotWindow = () => cutWindow
