// compress-electron.js
import { nativeImage } from 'electron'

// path.sep 特定于平台的文件分隔符。 '\' 或者 '/'  path.parse('').name 文件名 path.parse('').ext 文件后缀
export default (imgPath: string, quality = 50) => {
  const image = nativeImage.createFromPath(imgPath)

  // 图片压缩质量，可选值：better || good || best
  const res = image.resize({
    quality: 'best',
  })

  // const imageData = res.toPNG()
  // jpg 压缩 图片质量设置
  return res.toJPEG(quality)
}
