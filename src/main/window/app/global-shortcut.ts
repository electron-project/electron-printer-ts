import { BrowserWindow, globalShortcut } from 'electron'
import { getMainWindow } from '@/main/window/main'
import { createScreenShotWindows, getScreenShotWindows } from '@/main/window/screenshot'

export function regGlobalShortcut() {
  globalShortcut.register('CmdOrCtrl + e', async () => {
    console.log('创建快捷键')
  })

  globalShortcut.register('F12', () => {
    const win = getMainWindow()

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
