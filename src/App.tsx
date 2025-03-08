//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { projects } from './data/projects'
import { Project } from './scripts/Project'
import { PersonalLink } from './scripts/PersonalLink';
import { links } from './data/links';

function App() {
  return (
    <>
      <h1>Portafolio Luciano Hernández</h1>
      <h2 className="text-start text-2xl font-bold py-5">Enlaces</h2>
      <PersonalLink.Table
        links={links}
        height={24}
        tdStyle="text-start py-0.5"
      />
      <h2 className="text-start text-2xl font-bold py-5">Proyectos</h2>
      <Project.Table
        projects={projects}
        height={50}
        style="border-collapse w-full"
        thStyle="border border-solid"
        tdStyle="border border-solid p-2.5"
      />
    </>
  )
}

export default App