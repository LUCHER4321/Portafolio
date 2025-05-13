import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LanguagePage } from './routes/Language.tsx'
import { CategoryPage } from './routes/Category.tsx'
import { LanguageUpdate } from './routes/Update/Language.tsx'
import { CategoryUpdate } from './routes/Update/Category.tsx'
import { ProjectUpdate } from './routes/Update/Project.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Portafolio" element={<App/>}/>
        <Route path="/Portafolio/Language/:lan" element={<LanguagePage/>}/>
        <Route path="/Portafolio/Category/:cat" element={<CategoryPage/>}/>
        <Route path="/Portafolio/Update/Language" element={<LanguageUpdate/>}/>
        <Route path="/Portafolio/Update/Category" element={<CategoryUpdate/>}/>
        <Route path="/Portafolio/Update/Project" element={<ProjectUpdate/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
