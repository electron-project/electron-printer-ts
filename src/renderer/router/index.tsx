import { useRoutes } from 'react-router-dom'
import Home from '@/renderer/views/home'

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      // 子路由需要在其父路由的页面中添加 <Outlet />
      {
        path: 'camp',
      },
    ],
  },
]

// 自定义 hook
const useCustomRouter = () => {
  return useRoutes(routes)
}

export default useCustomRouter
