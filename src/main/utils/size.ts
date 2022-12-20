import { screen } from 'electron'

export function getSize() {
  // 获取主显示器信息
  const { size, scaleFactor } = screen.getPrimaryDisplay()

  return {
    width: Math.floor(size.width * scaleFactor),
    height: Math.floor(size.height * scaleFactor),
  }
}
