import path from 'path'
import { getSize } from '@/main/utils/size'
import { app, BrowserWindow } from 'electron'
import { resolveHtmlPath } from '@/main/utils/path'
import process from 'process'

let cutWindow: BrowserWindow | null

export async function createScreenShotWindow() {
  if (cutWindow) return

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

  await cutWindow.loadURL(resolveHtmlPath('index.html', 'screenshot-layout/use'))

  cutWindow.maximize()
  cutWindow.setFullScreen(true)
}

export function closeScreenShotWindow(option={force:false}) {
  cutWindow?.close()

  if (option.force){
    cutWindow = null
  }
}

export const getScreenShotWindow = () => cutWindow
