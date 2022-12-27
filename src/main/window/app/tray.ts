import { app, Menu, nativeImage, Tray } from 'electron'
import { getPrintWindow } from '@/main/window/print'
import { ElectronPath } from '@/main/constant/path'
import setProgramStart from '@/main/utils/boot-start'

const initTray = () => {
  const win = getPrintWindow()
  if (!win) return

  // Mac 只支持 16*16 大小
  const icon = nativeImage.createFromPath(ElectronPath.icon16)
  const tray = new Tray(icon)

  // 鼠标移到托盘中应用程序的图标上时，显示的文本
  tray.setToolTip('图片压缩')
  // mac 设置状态栏图标旁边的文字
  // tray.setTitle('标题')

  // 点击图标的响应事件
  tray.on('click', (e) => {
    if (win.isVisible()) {
      win.hide()
      // 设置关闭任务栏中的图标
      win.setSkipTaskbar(true)
    } else {
      win.show()
      win.setSkipTaskbar(false)
    }
  })

  // 右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
  tray.on('right-click', () => {
    tray.popUpContextMenu(menuConfig)
  })

  const menuConfig = Menu.buildFromTemplate([
    {
      label: '自启动',
      type: 'checkbox',
      checked: app.getLoginItemSettings().openAtLogin || app.getLoginItemSettings().executableWillLaunchAtLogin,
      click: (menuItem, browserWindow, event) => {
        setProgramStart(menuItem.checked)
        // 右边是当前选择的状态，赋值给左边后续显示的状态
        menuItem.checked = menuItem.checked
      },
    },
    {
      label: '打开开发者工具',
      click: () => win.webContents.toggleDevTools(),
    },
    {
      label: '退出',
      click: () => app.quit(),
    },
  ])
}

export default initTray
