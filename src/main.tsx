import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import SupportPage from './pages/support.tsx'
import NewsletterPage from './pages/newsletter.tsx'
import NewsletterEditionPage from './pages/newsletter-edition.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/newsletter/:id" element={<NewsletterEditionPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
