import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { PersonalLink } from './classes/PersonalLink';
import { links } from './data/links';
import { Language } from './classes/Language';
import { languages } from './data/languages';
import { codeText } from './functions/translate';
import { NavBar } from './components/NavBar';
import { Category } from './classes/Category';
import { categories } from './data/categories';
import { ContactForm } from './components/ContactFrom';

function App() {
  const [language, setLanguage] = useState("spanish");

  return (
    <>
      <NavBar language={language} setLanguage={setLanguage}/>
      <div className="flex md:flex-row flex-col md:items-center md:justify-around w-full">
        <h1 className="align-middle md:w-1/5 w-full">Luciano Hernández</h1>
        <div className="flex flex-col text-justify my-4 w-full md:w-3/5">
          <h2>{codeText("stt04", language)}</h2>
          <p>{codeText("prg00", language)}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:justify-around">
        <div className="flex flex-col">
          <h2>{codeText("stt00", language)}</h2>
          <PersonalLink.Table
            language={language}
            links={links}
            height={24}
            hoverHeight={32}
            tdClassName="text-start py-0.5 pr-2"
          />
        </div>
        <div className="flex flex-col">
          <h2>{codeText("stt03", language)}</h2>
          <Category.Table
            categories={categories}
            href={c => `/Portafolio/Category?cat=${c.id}`}
            language={language}
            imgClassName="flex justify-center p-2.5"
            size={30}
            hoverSize={35}
          />
        </div>
        <div className="flex flex-col sm:w-2/7">
          <h2>{codeText("stt01", language)}</h2>
          <Language.List
            languages={languages}
            href={l => `/Portafolio/Language?lan=${l.name}`}
            className="flex flex-wrap justify-center"
            buttonClassName="flex m-1 justify-center p-2.5"
            size={30}
            hoverSize={40}
          />
        </div>
      </div>
      <ContactForm language={language}/>
    </>
  )
}

export default App