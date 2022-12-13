import { ipcMain, desktopCapturer } from 'electron'
import { createScreenShotWindows, getScreenShotWindows } from '@/main/window/screenshot'
import { getMainWindow } from '@/main/window/main'
import { getSize } from '@/main/utils/size'

ipcMain.on('capture-screen', (e, { type = 'start', screenId } = {}) => {
  if (type === 'start') {
    createScreenShotWindows().then()
  } else if (type === 'complete') {
    // nothing
  } else if (type === 'select') {
    const wins = getScreenShotWindows()
    wins.forEach((win) => win.webContents.send('capture-screen', { type: 'select', screenId }))
  }
})

ipcMain.on('SHOW_CUT_SCREEN', async (event) => {
  try {
    let sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: getSize(),
    })

    event.reply('GET_SCREEN_IMAGE', sources[0].thumbnail.toDataURL())
  } catch (e) {
    console.log(e)
  }
})
