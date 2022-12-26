import { closePrintWindow, getPrintWindow } from '@/main/window/print/index'

export const initPrintEvent = () => {
  let win = getPrintWindow()

  win?.on('closed', (event: Event) => {
    closePrintWindow()
  })
}
