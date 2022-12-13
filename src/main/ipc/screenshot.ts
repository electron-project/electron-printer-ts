import { ipcMain, desktopCapturer, clipboard, nativeImage, dialog } from 'electron'
import { getSize } from '@/main/utils/size'
import fs from 'fs'
import { getScreenShotWindows } from '@/main/window/screenshot'

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

ipcMain.on('SCREENSHOT_IMAGE', async (event, base64) => {
  const wins = getScreenShotWindows()
  wins.forEach((item) => {
    item.close()
  })

  // 复制到剪贴板
  clipboard.writeImage(nativeImage.createFromDataURL(base64[0]))

  // 保存到本地
  const path = await dialog.showSaveDialog({
    title: '截图',
    buttonLabel: '保存图片',
    message: '我是消息', // mac
    nameFieldLabel: 'nameFieldLabel', // mac
    showsTagField: true, // mac
    properties: [
      'showHiddenFiles', // 显示对话框中的隐藏文件
      'createDirectory', // 允许你通过对话框的形式创建新的目录。mac
      'treatPackageAsDirectory', // 将包 (如 .app 文件夹) 视为目录而不是文件。mac
      'dontAddToRecent', // 不要将正在保存的项目添加到最近的文档列表中。
    ],
    filters: [
      {
        name: 'Images',
        extensions: ['png', 'jpg', 'gif'],
      },
    ],
  })

  if (path.filePath) {
    fs.writeFile(path.filePath, new Buffer(base64[0].replace('data:image/png;base64,', ''), 'base64'), () => {})
  }
})
