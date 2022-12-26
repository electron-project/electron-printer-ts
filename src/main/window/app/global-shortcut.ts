import { BrowserWindow, globalShortcut } from 'electron'

export function regGlobalShortcut() {
  // globalShortcut.unregisterAll() 注销所有快捷键
  globalShortcut.register('CmdOrCtrl + Shift + I', () => {
    const win = BrowserWindow.getFocusedWindow()

    if (win?.webContents.isDevToolsOpened()) {
      win?.unmaximize() // 取消窗口最大化
      win?.setResizable(false)
    } else {
      win?.setResizable(true)
      win?.maximize()
    }
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
