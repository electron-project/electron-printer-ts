import { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = [REACT_DEVELOPER_TOOLS]

  return installer.default(extensions, forceDownload).catch((err: Error) => {
    console.log(`扩展安装错误: ${err}`)
  })
}

export default installExtensions
