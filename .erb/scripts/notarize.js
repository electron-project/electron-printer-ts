const { notarize } = require('electron-notarize')
const { build } = require('../../package.json')

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  if (process.env.CI !== 'true') {
    console.warn('跳过公证步骤。打包未在 CI 中运行')
    return
  }

  if (!('APPLE_ID' in process.env && 'APPLE_ID_PASS' in process.env)) {
    console.warn('跳过公证步骤。必须设置 APPLE_ID 和 APPLE_ID_PASS 环境变量')
    return
  }

  const appName = context.packager.appInfo.productFilename

  await notarize({
    appBundleId: build.appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS,
  })
}
