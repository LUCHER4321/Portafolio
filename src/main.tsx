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
import { LinkTree } from './routes/LinkTree.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Portafolio">
          <Route index element={<App/>} />
          <Route path="Language/:lan" element={<LanguagePage/>} />
          <Route path="Category/:cat" element={<CategoryPage/>} />
          <Route path="LinkTree" element={<LinkTree/>}/>
          <Route path="Update">
            <Route path="Language" element={<LanguageUpdate/>} />
            <Route path="Category" element={<CategoryUpdate/>} />
            <Route path="Project" element={<ProjectUpdate/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
