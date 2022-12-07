import { Link, Outlet } from 'react-router-dom'
import styles from './index.module.scss'

const Home = () => {
  return (
    <div className={styles.home}>
      <div>
        <Link to={'print'}>go 打印界面</Link>
      </div>

      <div>
        <Link to={'screenshot-use'}>截图</Link>
      </div>

      <div>
        <Link to={'screenshot'}>虚拟截图</Link>
      </div>

      <Outlet />
    </div>
  )
}

export default Home
