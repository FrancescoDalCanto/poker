import './language/i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App'
import HomeUtente from './home_utente'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home_utente" element={<HomeUtente />} />






      </Routes>
    </BrowserRouter>
  </StrictMode>
)
