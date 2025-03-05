//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { projects } from './data/projects'
import { Project } from './scripts/Project'
import { PersonalLink } from './scripts/PersonalLink';
import { links } from './data/links';

function App() {
  const collapse = {borderCollapse: "collapse", width: "100%"} as React.CSSProperties;
  const border = {border: "1px solid"} as React.CSSProperties;
  const start = {textAlign: "start"} as React.CSSProperties;
  return (
    <>
      <h1>Portafolio Luciano Hernández</h1>
      <h2 style={start}>Enlaces</h2>
      <PersonalLink.Table
        links={links}
        height={24}
        tdStyle={start}
      />
      <h2 style={start}>Proyectos</h2>
      <Project.Table
        projects={projects}
        height={50}
        style={collapse}
        thStyle={border}
        tdStyle={border}
      />
    </>
  )
}

export default App