import { useRoutes } from 'react-router-dom'
import Print from '@/renderer/views/printer/print'
import VirtualScreenshot from '@/renderer/views/screenshot/virtual-screenshot'
import ScreenshotLayout from '@/renderer/views/screenshot/layout'
import PrinterLayout from '@/renderer/views/printer/layout'
import MainLayout from '@/renderer/views/main/layout'
import PrintSetting from '@/renderer/views/printer/setting'

const routes = [
  {
    path: '/main',
    element: <MainLayout />,
  },
  {
    path: '/printer-layout',
    element: <PrinterLayout />,
    children: [
      // 子路由需要在其父路由的页面中添加 <Outlet />
      {
        index: true,
        path: 'print',
        element: <Print />,
      },
      {
        index: true,
        path: 'setting',
        element: <PrintSetting />,
      },
    ],
  },
  {
    path: '/screenshot-layout',
    element: <ScreenshotLayout />,
    children: [
      {
        index: true,
        path: 'virtual',
        element: <VirtualScreenshot />,
      },
    ],
  },
]

// 自定义 hook
const useCustomRouter = () => {
  return useRoutes(routes)
}

export default useCustomRouter
