import { closePrintSetting, getPrintSetting } from '@/main/window/print-setting/index'

export const initPrintSettingEvent = () => {
  let win = getPrintSetting()

  win?.on('closed', () => {
    closePrintSetting()
  })
}
