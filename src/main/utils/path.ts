import { URL } from 'url'
import path from 'path'
import { app } from 'electron'
import { isDev } from '@/main/constant/env'
import process from 'process'
import { ElectronPath } from '@/main/constant/path'

export function resolveHtmlPath(htmlFileName: string, hash?: string) {
  // 让测试开机自启动使用
  if (process.env.NODE_ENV === undefined) {
    return `file://${path.resolve(ElectronPath.cwdStatic, 'release/app/dist/renderer/', htmlFileName)}${
      hash ? `#/${hash}` : ''
    }`
  }

  if (isDev) {
    const port = process.env.PORT || 1212
    const url = new URL(`http://localhost:${port}`)
    url.pathname = htmlFileName
    url.hash = hash ? '/' + hash : ''
    return url.href
  }

  // + `/${hash}`
  // xx.loadFile(path.join(__dirname, '../dist/index.html'), {
  //   hash: 'xx',
  // })

  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}${hash ? `#/${hash}` : ''}`
}
