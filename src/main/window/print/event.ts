import { closePrintWindow, getPrintWindow } from '@/main/window/print/index'
import { isDev } from '@/main/constant/env'
import { app } from 'electron'

export const initPrintEvent = () => {
  let win = getPrintWindow()

  win?.on('close', (event: Event) => {
    if (!isDev) {
      win?.hide()
      // 设置关闭任务栏中的图标
      win?.setSkipTaskbar(true)
      event.preventDefault()
    }

    if (isDev) {
      app.quit()
    }
  })

  win?.on('closed', (event: Event) => {
    closePrintWindow()
  })
}
