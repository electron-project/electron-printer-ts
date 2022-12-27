import process from 'process'
import { app } from 'electron'
import path from 'path'

const setProgramStart = (enable: boolean) => {
  const appFolder = path.dirname(process.execPath)
  const exeName = path.basename(process.execPath)
  const updateExe = path.resolve(appFolder, '..', 'Update.exe')

  app.setLoginItemSettings({
    path: app.isPackaged ? undefined : appFolder,
    args: ['--openAsHidden'],
    openAtLogin: enable, // true 登录时打开应用程序， false 将应用从登录启动项中删除
    openAsHidden: false, // mac 以隐藏方式打开应用程序
    enabled: true, // win 更改已启用的启动注册表项，并在任务管理器和 Windows 设置中 启用 / 禁用 应用程序。 默认值为 true
    name: exeName,
  })
}

export default setProgramStart
