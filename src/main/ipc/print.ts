import { BrowserWindow, ipcMain } from 'electron'
import { getMainWindow } from '@/main/window/main';

const initPrint = () => {
 const win =  getMainWindow()

  ipcMain.on('ipc-printer-getList', async (event, args) => {
    const list = await win?.webContents.getPrintersAsync()
    win?.webContents.send('ipc-printer-getList', list)
  })
}

export default initPrint
