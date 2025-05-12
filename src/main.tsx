import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route } from 'react-router-dom'
import { LanguagePage } from './routes/Language.tsx'
import { CategoryPage } from './routes/Category.tsx'
import { LanguageUpdate } from './routes/Update/Language.tsx'
import { CategoryUpdate } from './routes/Update/Category.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Route path="/Portafolio">
        <Route path="/" element={<App/>}/>
        <Route path="/Language/:lan" element={<LanguagePage/>}/>
        <Route path="/Category/:cat" element={<CategoryPage/>}/>
        <Route path="/Update">
          <Route path="/Language" element={<LanguageUpdate/>}/>
          <Route path="/Category" element={<CategoryUpdate/>}/>
        </Route>
      </Route>
    </BrowserRouter>
  </StrictMode>,
)
