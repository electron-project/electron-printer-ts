import path from 'path'
import process from 'process'
import { app } from 'electron'

const log = path.resolve(process.cwd(), 'logs/crash')

// process.resourcesPath 对应 extraResources 的地址
const assets = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(process.cwd(), 'assets')
const icon = path.resolve(assets, 'icons/icon.png')
const icon16 = path.resolve(assets, 'icons/16x16.png')
const cwdStatic = path.resolve('D:\\soft-dev\\code\\web\\frame\\React\\electron-printer')

export const ElectronPath = {
  log,
  icon,
  icon16,
  cwdStatic,
}
