import styles from './index.module.scss'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ className }: any) => {
  const containerClass = `${styles['route-view-layout']} ${className || ''}`
  return (
    <div className={containerClass}>
      <Outlet />
    </div>
  )
}

MainLayout.defaultProps = {
  className: '',
}

export default MainLayout
