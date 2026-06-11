import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import SupportPage from './pages/support.tsx'
import NewsletterPage from './pages/newsletter.tsx'
import NewsletterEditionPage from './pages/newsletter-edition.tsx'
import NotFoundPage from './pages/not-found.tsx'
import SectionPage from './pages/section.tsx'
import SectionPostPage from './pages/section-post.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/newsletter/:id" element={<NewsletterEditionPage />} />
        <Route path="/sections/:slug" element={<SectionPage />} />
        <Route path="/sections/:slug/:id" element={<SectionPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
