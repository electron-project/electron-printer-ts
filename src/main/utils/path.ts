import { URL } from 'url'
import path from 'path'

export function resolveHtmlPath(htmlFileName: string, hash?: string) {
  if (process.env.NODE_ENV === 'development') {
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
