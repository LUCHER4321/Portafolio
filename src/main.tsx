import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LanguagePage } from './routes/Language.tsx'
import { CategoryPage } from './routes/Category.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Portafolio" element={<App/>}/>
        <Route path="/Portafolio/Language" element={<LanguagePage/>}/>
        <Route path="/Portafolio/Category" element={<CategoryPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
