import { ipcMain, Notification } from 'electron'
import { getPrintWindow } from '@/main/window/print'
import { createPrintSetting, getPrintSetting } from '@/main/window/print-setting'
import { getElectronStore } from '@/main/utils/store'
import { assetsPath } from '@/constant/icon'
import toastXmlString from '@/main/utils/notification-xml'

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

  ipcMain.on('PRINTER_NOTIFICATION', async (event, args) => {
    const notification = new Notification({
      title: '标签',
      body: '打印机开始打印',
      silent: false, // 是否静默通知
      icon: assetsPath('icons/icon.png'),
      timeoutType: 'default', // 通知持续时间

      // toastXml: toastXmlString, // win
      // subtitle: '子标题', // mac
      // hasReply: true, // 是否有答复项 mac
      // replyPlaceholder: '', // 答复输入框中的占位符 mac
      // sound: '', // 显示通知时播放的声音文件的名称 mac
      // actions: [] // 要添加到通知中的操作 请阅读 NotificationAction文档来了解可用的操作和限制
      // closeButtonText: '', // 自定义关闭按钮提示内容。 空字符串将替换为默认的本地化文本。 mac
    })
    notification.show()
  })
}

export default initPrintIPC
