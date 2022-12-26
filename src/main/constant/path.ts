import path from 'path'
import process from 'process'
import { app } from 'electron'

const log = path.resolve(process.cwd(), '/logs/crash')

// process.resourcesPath 对应 extraResources 的地址
const assets = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(process.cwd(), 'assets')
const icon = path.resolve(assets, 'icons/icon.png')

export const ElectronPath = {
  log,
  icon
}
