// electron-updater文档：https://www.electron.build/auto-update
// 文章：https://juejin.cn/post/7137568227080552461
import { autoUpdater, UpdateCheckResult } from 'electron-updater'
import { DownloadNotification } from 'electron-updater/out/AppUpdater'
import logger from 'electron-log'
import { dialog } from 'electron'

// 调试技巧
// 在开发时我们可能会做开发调试，比如看下载进度呀什么的，先打了一个高版本的放在远程地址，本地重复安装低版本的看更新效果
// 但是在第一次更新完成后，后面的更新都是瞬间完成了
// 看不到进度，这里是由于electron-updater在更新时会检测本地是否下载过这个高版本，
// 有的话直接用本地的进行安装，我们可以把这个缓存文件删除掉。AppData这个文件夹呢可能是处于隐藏的，
// 后面挺多地方会用到这个的，可以在顶端查看中勾选隐藏的项目让其显示
//
// 具体缓存路径如下（项目名对应package.json中的name）：
// win：C:\Users\Administrator（你的用户）\AppData\Local\项目名-updater
// mac：~/Library/Application Support/Caches/项目名-updater

// 日志位置，就是electron-log本身使用的日志位置了，其路径如下：
// on Linux:@/.config/{app name}/logs/{process type}.log
// on macOS:@/Library/Logs/{app name}/{process type}.log
// on Windows:c\用户\AppData\Roaming\{app name}\logs\{process type}.log
const AppUpdater = async () => {
  initUpdateEvent()

  // autoUpdater.checkForUpdatesAndNotify(downloadNotification) 检查更新并通知并自动安装下载
  // autoUpdater.setFeedURL({ provider: 'generic', url: '' }) // 代码设置更新地址，就不用在 electron-builder 配置文件设置
  logger.transports.file.level = 'info'
  autoUpdater.logger = logger
  autoUpdater.autoDownload = false // 将自动下载包设置为false

  await autoUpdater.checkForUpdates()
}

const initUpdateEvent = () => {
  autoUpdater.on('error', (error, message) => {
    logger.error('检查更新出错')
    logger.error(error)
    logger.error(message)
  })

  autoUpdater.on('update-not-available', (info) => {
    logger.info('现在使用的就是最新版本，不用更新')
  })

  autoUpdater.on('checking-for-update', () => {
    logger.info('正在检查更新……')
  })

  // 发现有新版本时触发
  autoUpdater.on('update-available', async (info) => {
    logger.info(`有新的可用版本:${info.version}`)
    await autoUpdater.downloadUpdate() // 手动下载
  })

  autoUpdater.on('download-progress', (info) => {
    logger.info('正在下载...')
    logger.info(`总共大小:${info.total}`)
    logger.info(`每秒字节:${info.bytesPerSecond}byte/s`)
    logger.info(`delta: ${info.delta}`)
    logger.info(`percent: ${info.delta}`)
    logger.info(`进度:${info.percent}`)
    logger.info(`transferred:${info.transferred}`)
  })

  // 新版本下载完成时触发
  autoUpdater.on('update-downloaded', (updateDownloadEvent) => {
    logger.info(`下载完成 版本:${updateDownloadEvent.version}`)
    logger.info(`文件位置:${updateDownloadEvent.downloadedFile}`)

    const { releaseNotes, releaseName } = updateDownloadEvent

    dialog
      .showMessageBox({
        type: 'info',
        buttons: ['确定', '取消'],
        title: '应用更新',
        message: '',
        detail: '发现有新版本，是否更新？',
      })
      .then((returnVal) => {
        if (returnVal.response === 0) {
          logger.info('开始安装')
          logger.info(`releaseNotes:${releaseNotes} releaseName:${releaseName}`)
          autoUpdater.quitAndInstall(true, true)
        } else {
          return logger.info('取消更新')
        }
      })
  })
}

export default AppUpdater
