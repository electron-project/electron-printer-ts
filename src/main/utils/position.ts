import { BrowserWindow, Tray } from 'electron'

// 获取窗口位置为 图标的 位置
const getPositionFromActiveDisplay = (win: BrowserWindow, tray: Tray) => {
  const trayBounds = tray.getBounds()
  const windowBounds = win.getBounds()

  const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2)
  const y = Math.round(trayBounds.y + trayBounds.height)

  return { x, y }
}

// 设置窗口位置
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const showWindow = (win: BrowserWindow, tray: Tray) => {
  const { x, y } = getPositionFromActiveDisplay(win, tray)
  win.setPosition(x, y, true)
  win.show()
}
