import process from 'process'
import { app } from 'electron'
import path from 'path'
import getProgramExecParams from '@/main/utils/get-exec-params'
import ExecParams from '@/main/constant/exec'

const setProgramStart = (enable: boolean) => {
  const appFolder = path.dirname(process.execPath)
  const exeName = path.basename(process.execPath)
  const updateExe = path.resolve(appFolder, '..', 'Update.exe')

  // 执行代码之后，会在系统的注册表中写入对应的数据。 运行regedit，打开注册表。
  // 依次展开 HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
  // 就可以找到开机注册项
  app.setLoginItemSettings({
    path: app.isPackaged ? undefined : process.execPath,
    args: app.isPackaged ? [ExecParams.BootStartHidden] : [...getProgramExecParams(ExecParams.BootStartHidden)],
    openAtLogin: enable, // true 登录时打开应用程序， false 将应用从登录启动项中删除
    openAsHidden: true, // mac 以隐藏方式打开应用程序
    enabled: true, // win 更改已启用的启动注册表项，并在任务管理器和 Windows 设置中 启用 / 禁用 应用程序。 默认值为 true
    name: 'electron-printer', // 注册表名
  })
}

export default setProgramStart
