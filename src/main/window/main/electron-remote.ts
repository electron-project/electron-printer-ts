import { BrowserWindow } from 'electron'

const initElectronRemote = async (win: BrowserWindow) => {
  // 在 14 版本 require('electron').remote 方式被移除
  // yarn add @electron/remote
  // https://www.electronjs.org/zh/docs/latest/breaking-changes#removed-remote-module
  import('@electron/remote/main')
    // eslint-disable-next-line promise/always-return
    .then((res) => {
      res.initialize()
      res.enable(win.webContents)
    })
    .catch(console.log)
}

export default initElectronRemote
