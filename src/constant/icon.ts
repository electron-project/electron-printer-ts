import { app } from 'electron'
import path from 'path'

const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(process.cwd(), 'assets')

export const assetsPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths)
}
