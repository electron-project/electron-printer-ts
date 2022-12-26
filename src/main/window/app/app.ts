import { app, BrowserWindow } from 'electron'
import { createMainWindow } from '@/main/window/main'
import { createPrintWindow } from '@/main/window/print'
import Platform from '@/main/constant/platform'
import '@/main/ipc/index'
import { initStore } from '@/main/utils/store'
import { regGlobalShortcut } from '@/main/window/app/global-shortcut'
import initCommonIPC from '@/main/ipc/common'
import initTray from '@/main/window/app/tray'

// 当Electron完成时，该方法将被调用
// 初始化并准备创建浏览器窗口。
// 某些api只有在此事件发生后才能使用。
app
  .whenReady()
  .then(async () => {
    initStore()
    initCommonIPC()
    regGlobalShortcut()

    // objc[85955]: Class WebSwapCGLLayer is implemented in both xxxxx One of the two will be used. Which one is undefined.
    // Failed to fetch extension, trying 4 more times
    // 是因为安装开发者工具 没有外网
    // 必须在 loadURL 之前进行安装
    // if (isDev) await installExtensions()

    // createMainWindow().then()
    await createPrintWindow()
    // createPrintSetting().then()

    initTray()
  })
  .catch(console.log)

// 在macOS上，在应用程序中重新创建一个窗口是常见的
// 单击dock图标，没有打开其他窗口。
app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) await createMainWindow()
})

// window 平台窗口关闭时候，
app.on('window-all-closed', () => {
  // 对于 mac ,设置 tray 后需要在 tray 的退出中显式指定 app.quit, 因为 tray 是不能所有窗口关闭的时候销毁 app 的
  if (!Platform.isMac) {
    app.quit()
  }
})

// 通过 warn 给 crashReporter 记录日志
// 监控渲染进程错误
app.on('render-process-gone', (event, webContents, details) => {
  console.warn(
    'app:renderer-process-crashed',
    JSON.stringify(event),
    JSON.stringify(webContents),
    JSON.stringify(details)
  )
})

// 监控子进程错误
// electron-helper、electron-helper (GPU) 主进程
app.on('child-process-gone', (event, details) => {
  console.warn('app:child-process-gone', JSON.stringify(event), JSON.stringify(details))
})
