import { closePrintWindow, getPrintWindow } from '@/main/window/print/index'
import { isDev } from '@/main/constant/env'
import { app } from 'electron'
import ExecParams from '@/main/constant/exec'
import process from 'process'

export const initPrintEvent = () => {
  let win = getPrintWindow()

  win?.on('ready-to-show', () => {
    // 设置自启动为托盘
    if (!process.argv.includes(ExecParams.BootStartHidden)) {
      win?.show()
    }
  })

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
