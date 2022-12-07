import { BrowserWindow, ipcMain } from 'electron'

const initPrintIpcMain = (mainWindow: BrowserWindow) => {
  ipcMain.on('ipc-printer-getList', async (event, args) => {
    const list = await mainWindow.webContents.getPrintersAsync()
    mainWindow.webContents.send('ipc-printer-getList', list)
  })
}

export default initPrintIpcMain
