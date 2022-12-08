// https://juejin.cn/post/7111115472182968327#heading-6
import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'

const VirtualScreenshot = ({ className }: any) => {
  const ipcRenderer = window.electron.ipcRenderer

  const containerClass = `${styles['virtual-screenshot']} ${className || ''}`
  const [bg, setBg] = useState('')
  const containerRef = useRef<any>(null)

  useEffect(() => {
    ipcRenderer.send('SHOW_CUT_SCREEN', { a: 1 })
    // ipcRenderer.off('SHOW_CUT_SCREEN', getSource)
    ipcRenderer.on('GET_SCREEN_IMAGE', getSource)
  }, [])

  async function getSource(source: any) {
    const { thumbnail } = source
    setBg(await thumbnail.toDataURL())

    console.log(source)
    render() // 绘制渲染canvas舞台等任务
  }

  function createStage() {
    return new Konva.Stage({
      container: containerRef.current || '',
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  const layerRef = useRef<any>(null)
  let rect: any, transformer: any

  function createLayer(stage: any) {
    let layer = new Konva.Layer()
    stage.add(layer)
    layer.draw()
    return layer
  }

  function render() {
    const stage = createStage()
    layerRef.current = createLayer(stage)
  }

  const isDown = useRef<any>(false)
  const rectOption = useRef<any>({})

  function onMouseDown(e: any) {
    if (rect || isDown.current) return
    isDown.current = true
    const { pageX, pageY } = e
    rectOption.current.x = pageX || 0
    rectOption.current.y = pageY || 0
    rect = createRect(layerRef.current, pageX, pageY, 0, 0, 0.25, false)
    rect?.draw()
  }

  function onMouseMove(e: any) {
    if (!isDown.current) return

    const { pageX, pageY } = e
    let w = pageX - rectOption.current.x
    let h = pageY - rectOption.current.y
    rect?.remove()
    rect = createRect(layerRef.current, rectOption.current.x, rectOption.current.y, w, h, 0.25, false)
    rect.draw()
  }

  function onMouseUp(e: any) {
    if (!isDown.current) return
    isDown.current = false
    const { pageX, pageY } = e
    let w = pageX - rectOption.current.x
    let h = pageY - rectOption.current.y
    rect?.remove()
    rect = createRect(layerRef.current, rectOption.current.x, rectOption.current.y, w, h, 0, true)
    rect.draw()

    // todo transformer = createTransformer(rect)
  }

  function createRect(layer: any, x: any, y: any, w = 0, h = 0, opacity = 0, draggable = false) {
    // const { clientWidth, clientHeight } = containerRef.current

    const width = w,
      height = h

    let rect = new Konva.Rect({
      x,
      y,
      width,
      height,
      fill: `rgba(255,0,0,${opacity})`,
      name: 'rect',
      draggable,
    })

    layer?.add(rect)
    return rect
  }

  // 根据区域生成图片
  async function getCutImage(info: any) {
    const { x, y, width, height } = info
    let img = new Image()
    img.src = bg
    let canvas = document.createElement('canvas')
    let ctx: any = canvas.getContext('2d')
    canvas.width = ctx.width = width
    canvas.height = ctx.height = height
    ctx.drawImage(img, -x, -y, window.innerWidth, window.innerHeight)
    return canvas.toDataURL('image/png')
  }

  // 确认截图方法
  async function handleCut() {
    const { width, height, x, y, scaleX = 1, scaleY = 1 } = rect.attrs
    let _x = width > 0 ? x : x + width * scaleX
    let _y = height > 0 ? y : y + height * scaleY
    let pic = await getCutImage({
      x: _x,
      y: _y,
      width: Math.abs(width) * scaleX,
      height: Math.abs(height) * scaleY,
    })
    // 目的是发给主窗体页面让其接收到这个图片
    ipcRenderer.send('CUT_SCREEN', pic)
  }

  // 直接退出截屏
  function closeCut() {
    ipcRenderer.send('CLOSE_CUT_SCREEN')
  }

  return (
    <div className={containerClass}>
      <div
        className={styles.container}
        style={{ backgroundImage: ` + ${bg} + ` }}
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      ></div>
    </div>
  )
}

VirtualScreenshot.defaultProps = {
  className: '',
}

export default VirtualScreenshot
