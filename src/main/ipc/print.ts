import { ipcMain } from 'electron'
import { createPrintWindow, getPrintWindow } from '@/main/window/print'
import { createPrintSetting, getPrintSetting } from '@/main/window/print-setting'
import { getElectronStore } from '@/main/utils/store'

const initPrintIPC = async () => {
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
    win?.destroy()

    const store = getElectronStore()
    store?.delete('device-name')
    store?.set('device-name', args[0])

    const print = getPrintWindow()
    print?.webContents.send('PRINTER_SURE_DEVICE')
  })
}

export default initPrintIPC
