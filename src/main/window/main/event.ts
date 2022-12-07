import { BrowserWindow, shell } from 'electron'

export const initEvent = (mainWindow: BrowserWindow | null) => {
  // 渲染进程中请求创建一个新窗口之前被调用，例如 window.open()，
  // 带 target="_blank" 的链接，按shift 点击链接，
  // 或使用 <form target="_blank"> 提交一个表单。
  mainWindow?.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url)
    return { action: 'deny' }
  })

  mainWindow?.on('ready-to-show', () => {
    if (!mainWindow) throw new Error('"主窗口没有定义')

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
    }
  })

  mainWindow?.on('closed', () => {
    mainWindow = null
  })
}
