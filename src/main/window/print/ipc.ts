import { BrowserWindow, ipcMain } from 'electron'

const initPrint = (win: BrowserWindow) => {
  ipcMain.on('ipc-printer-getList', async (event, args) => {
    const list = await win.webContents.getPrintersAsync()
    win.webContents.send('ipc-printer-getList', list)
  })
}

export default initPrint
