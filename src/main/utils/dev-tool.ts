import { WebContents } from 'electron'

// eslint-disable-next-line
export function isOpenOrCloseDevtools(webContents: WebContents) {
  // webContents.toggleDevTools() 也可以
  return webContents.isDevToolsOpened() ? webContents.closeDevTools() : webContents.openDevTools()
}
