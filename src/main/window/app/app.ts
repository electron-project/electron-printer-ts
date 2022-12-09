import { app, BrowserWindow } from 'electron'
import { createMainWindow } from '@/main/window/main'
import { createPrintWindow } from '@/main/window/print'
import Platform from '@/constant/platform'
import '@/main/ipc/index'
import { createPrintSetting } from '@/main/window/print-setting';

// 当Electron完成时，该方法将被调用
// 初始化并准备创建浏览器窗口。
// 某些api只有在此事件发生后才能使用。
app
  .whenReady()
  .then(() => {
    // createMainWindow().then()
    createPrintWindow().then()
    // createPrintSetting().then()
  })
  .catch(console.log)

// 在macOS上，在应用程序中重新创建一个窗口是常见的
// 单击dock图标，没有打开其他窗口。
app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) await createMainWindow()
})

// window 平台窗口关闭时候，
app.on('window-all-closed', () => {
  // 在macOS中，这对于应用程序和它们的菜单栏来说很常见
  // 保持活动，直到用户显式退出Cmd + Q
  if (!Platform.isMac) {
    app.quit()
  }
})
