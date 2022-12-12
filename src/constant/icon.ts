import { app } from 'electron'
import path from 'path'

// process.resourcesPath 对应 extraResources 的地址
const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(process.cwd(), 'assets')

export const assetsPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths)
}
