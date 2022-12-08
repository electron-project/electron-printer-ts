import { Link, Outlet } from 'react-router-dom'
import styles from './index.module.scss'

const PrinterLayout = () => {
  return (
    <div className={styles.home}>
      <div>
        <Link to={'print'}>go 打印界面</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default PrinterLayout
