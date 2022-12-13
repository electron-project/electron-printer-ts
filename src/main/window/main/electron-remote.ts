import { BrowserWindow } from 'electron'
import { getMainWindow } from '@/main/window/main/index'

const initElectronRemote = async () => {
  const win = getMainWindow()
  if (!win) return

  // 在 14 版本 require('electron').remote 方式被移除
  // yarn add @electron/remote
  // https://www.electronjs.org/zh/docs/latest/breaking-changes#removed-remote-module
  // 并且需要开启 { webPreferences: { enableRemoteModule: true } }
  import('@electron/remote/main')
    // eslint-disable-next-line promise/always-return
    .then((res) => {
      res.initialize()
      res.enable(win.webContents)
    })
    .catch(console.log)
}

export default initElectronRemote
