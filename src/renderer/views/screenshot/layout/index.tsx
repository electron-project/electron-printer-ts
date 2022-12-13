import styles from './index.module.scss'
import { Outlet } from 'react-router-dom'

const ScreenshotLayout = ({ className }: any) => {
  const containerClass = `${styles['screenshot-layout']} ${className || ''}`
  return (
    <div className={containerClass}>
      <Outlet />
    </div>
  )
}

ScreenshotLayout.defaultProps = {
  className: '',
}

export default ScreenshotLayout
