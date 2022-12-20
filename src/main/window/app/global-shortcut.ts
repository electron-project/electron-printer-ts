import { BrowserWindow, globalShortcut } from 'electron'

export function regGlobalShortcut() {
  globalShortcut.register('CmdOrCtrl + Shift + F', () => {
    const win = BrowserWindow.getFocusedWindow()
    win?.webContents.toggleDevTools()
  })

  globalShortcut.register('F12', () => {
    const win = BrowserWindow.getFocusedWindow()
    win?.webContents.toggleDevTools()
  })

  // globalShortcut.register('Esc', () => {
  //   const cutWindows = getScreenShotWindows()
  //
  //   if (cutWindows) {
  //     cutWindows.forEach((win) => win.close())
  //   }
  // })
  //
  // globalShortcut.register('CmdOrCtrl+Shift+A', createScreenShotWindows)
}

// 检测是否注册成功
export function isReg() {
  const isDevTool = globalShortcut.isRegistered('ctrl + e') ? 'success' : 'fail'
  console.log(isDevTool)
}
