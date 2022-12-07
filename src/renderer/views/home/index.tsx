import { Link, Outlet } from 'react-router-dom'
import styles from './index.module.scss'

const Home = () => {
  return (
    <div className={styles.home}>
      <Link to={'print'}>go 打印界面</Link>
      <Outlet />
    </div>
  )
}

export default Home
