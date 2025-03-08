import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { projects } from './data/projects'
import { Project } from './scripts/Project'
import { PersonalLink } from './scripts/PersonalLink';
import { links } from './data/links';
import { Languaje } from './scripts/Languaje';
import { languajes } from './data/languajes';

function App() {
  const [languajeFilter, setLanguajeFilter] = useState(languajes);

  const addLanguaje = (l: Languaje) => {
    setLanguajeFilter(languajeFilter.concat([l]));
  };

  const quitLanguaje = (l: Languaje) => {
    setLanguajeFilter(languajeFilter.filter(lan => lan !== l));
  };

  const toggleLanguaje = (l: Languaje) => {
    if(languajeFilter.includes(l)){
      quitLanguaje(l);
    }
    else{
      addLanguaje(l);
    }
  }

  const allLanguajes = () => {
    setLanguajeFilter(languajes);
  }

  const noLanguajes = () => {
    setLanguajeFilter([]);
  }

  return (
    <>
      <h1>Portafolio Luciano Hernández</h1>
      <h2 className="text-start text-2xl font-bold py-5">Enlaces</h2>
      <PersonalLink.Table
        links={links}
        height={24}
        tdClassName="text-start py-0.5"
      />
      <h2 className="text-start text-2xl font-bold py-5">Lenguajes y Herraminetas</h2>
      <div className="flex flex-row mb-2">
        <button onClick={allLanguajes} className="mr-2">Mostrar Todo</button>
        <button onClick={noLanguajes} >Ocultar Todo</button>
      </div>
      <Languaje.List
        className="flex flex-wrap"
        languajes={languajes}
        onClick={toggleLanguaje}
        buttonClassName="mr-2 mb-2"
        height={l => languajeFilter.includes(l) ? 30 : 15}
      />
      <h2 className="text-start text-2xl font-bold py-5">Proyectos</h2>
      <Project.Table
        projects={projects}
        languajeFilter={languajeFilter}
        height={50}
        lanHeight={20}
        className="border-collapse"
        thClassName="border border-solid px-2"
        tdClassName="border border-solid p-2.5"
      />
    </>
  )
}

export default App