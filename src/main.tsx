import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@radix-ui/themes/styles.css'
import '@/styles/theme-config.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from '@/styles/ThemeProvider'
import QueryProvider from '@/api/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
