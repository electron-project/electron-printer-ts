import log from 'electron-log'
import { autoUpdater, UpdateCheckResult } from 'electron-updater'
import { DownloadNotification } from 'electron-updater/out/AppUpdater'

// 日志位置，就是electron-log本身使用的日志位置了，其路径如下：
// on Linux:@/.config/{app name}/logs/{process type}.log
// on macOS:@/Library/Logs/{app name}/{process type}.log
// on Windows:c\用户\AppData\Roaming\{app name}\logs\{process type}.log

const AppUpdater = (downloadNotification?: DownloadNotification): Promise<UpdateCheckResult | null> => {
  log.transports.file.level = 'info'
  autoUpdater.logger = log
  return autoUpdater.checkForUpdatesAndNotify(downloadNotification)
}

export default AppUpdater
