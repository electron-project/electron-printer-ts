import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'

const PrinterLayout = () => {
  return (
    <div className={styles.home}>
      <Outlet />
    </div>
  )
}

export default PrinterLayout
