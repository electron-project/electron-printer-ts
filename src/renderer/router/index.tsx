import { useRoutes } from 'react-router-dom'
import Home from '@/renderer/views/home'
import Print from '@/renderer/views/nodeintegration/print'
import ScreenshotUse from '@/renderer/views/screenshot-use'
import Screenshot from '@/renderer/views/screenshot'

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      // 子路由需要在其父路由的页面中添加 <Outlet />
      {
        index: true,
        path: 'print',
        element: <Print />,
      },
      {
        index: true,
        path: 'screenshot-use',
        element: <ScreenshotUse />,
      },
      {
        index: true,
        path: 'screenshot',
        element: <Screenshot />,
      },
    ],
  },
]

// 自定义 hook
const useCustomRouter = () => {
  return useRoutes(routes)
}

export default useCustomRouter
