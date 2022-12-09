import { ipcMain } from 'electron'
import { getPrintWindow } from '@/main/window/print'
import { createPrintSetting, getPrintSetting } from '@/main/window/print-setting'

const initPrint = async () => {
  ipcMain.on('PRINTER_GET_LIST', async (event, args) => {
    const win = getPrintWindow()

    const list = await win?.webContents.getPrintersAsync()
    win?.webContents.send('PRINTER_GET_LIST', list)
  })

  ipcMain.on('PRINTER_OPEN_SETTING', async (event, args) => {
    await createPrintSetting()
    const win = getPrintSetting()
    win?.webContents.send('SETTING_LIST', args)
  })

  ipcMain.on('PRINTER_SURE_DEVICE', async (event, args) => {
    const win = getPrintSetting()
    const print = getPrintWindow()
    win?.destroy()
    print?.webContents.send('PRINTER_DEVICE_NAME', args)
  })
}

export default initPrint
