import styles from './index.module.scss'
import { useState } from 'react'

const ScreenshotUse = ({ className }: any) => {
  const ipcRenderer = window.electron.ipcRenderer

  const containerClass = `${styles['screenshot-use']} ${className || ''}`
  const [previewImage, setPreviewImage] = useState<string>('')

  const startCut = () => {
    ipcRenderer.send('OPEN_CUT_SCREEN')
    ipcRenderer.once('cut-info', (info) => {
      console.log(info)
    })
  }

  return (
    <div className={containerClass}>
      <button onClick={startCut}>截图</button>

      <img src={previewImage} style={{ maxWidth: '100%' }} alt={''} />
    </div>
  )
}

ScreenshotUse.defaultProps = {
  className: '',
}

export default ScreenshotUse
