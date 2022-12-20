import { createRoot } from 'react-dom/client'
import App from './App'
import './css/base.scss'
import { HashRouter } from 'react-router-dom'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  // BrowserRouter 非 hash 路由
  <HashRouter>
    <App />
  </HashRouter>
)
