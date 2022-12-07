// 通过 electron 的 ipc 通信，从 render 传递参数来唤醒别的 app
import { ipcMain, shell } from 'electron'
import path from 'path'

ipcMain.on('shell:open', async () => {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked')
  const pagePath = path.join('file://', pageDirectory, 'index.html')
  await shell.openExternal(pagePath)
})
