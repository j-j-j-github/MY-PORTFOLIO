import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from './context/RouterContext'

createRoot(document.getElementById('root')!).render(
  <RouterProvider>
    <App />
  </RouterProvider>
)