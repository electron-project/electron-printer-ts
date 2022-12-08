import { ipcMain, desktopCapturer } from 'electron'
import { closeScreenShotWindow, createScreenShotWindow, getScreenShotWindow } from '@/main/window/screenshot'
import { getMainWindow } from '@/main/window/main'
import { getSize } from '@/main/utils/size'

ipcMain.on('OPEN_CUT_SCREEN', async () => {
  closeScreenShotWindow()
  getMainWindow()?.hide()

  await createScreenShotWindow()
  getScreenShotWindow()?.show()
})

ipcMain.on('SHOW_CUT_SCREEN', async (event) => {
  try {
    let sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: getSize(),
    })

    event.reply('GET_SCREEN_IMAGE', sources[0])
  } catch (e) {
    console.log(e)
  }
})

ipcMain.on('CUT_SCREEN', async (e, cutInfo) => {
  closeScreenShotWindow()

  const mainWindow = getScreenShotWindow()
  mainWindow?.webContents.send('GET_CUT_INFO', cutInfo)
  mainWindow?.show()
})

ipcMain.on('CLOSE_CUT_SCREEN', async (e) => {
  closeScreenShotWindow()
  const mainWindow = getScreenShotWindow()
  mainWindow?.show()
})
