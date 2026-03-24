import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './style.css'

// Apply saved theme immediately (before paint)
try {
  if (localStorage.getItem('rs-theme') === 'light') {
    document.documentElement.classList.add('light-theme')
  }
} catch {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
