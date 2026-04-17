import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import 'animate.css'
import './index.css'
import App from './App.jsx'
import { AdminPage } from './pages/AdminPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>,
)
