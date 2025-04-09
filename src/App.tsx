import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { PersonalLink } from './scripts/PersonalLink';
import { links } from './data/links';
import { Language } from './scripts/Language';
import { languages } from './data/languages';
import { codeText } from './scripts/translate';
import { NavBar } from './scripts/NavBar';
import { Category } from './scripts/Category';
import { categories } from './data/categories';

function App() {
  const [language, setLanguage] = useState("spanish");

  return (
    <>
      <NavBar language={language} setLanguage={setLanguage}/>
      <div className="flex sm:flex-row flex-col sm:items-center sm:justify-around w-full">
        <h1 className="align-middle sm:w-1/5 w-full">Luciano Hernández</h1>
        <div className="flex flex-col text-justify my-4 w-full sm:w-3/5">
          <h2 className="text-center text-2xl font-bold py-5 w-full">{codeText("stt04", language)}</h2>
          <p>{codeText("prg00", language)}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:justify-around">
        <div className="flex flex-col">
          <h2 className="text-center text-2xl font-bold py-5">{codeText("stt00", language)}</h2>
          <PersonalLink.Table
            language={language}
            links={links}
            height={24}
            hoverHeight={32}
            tdClassName="text-start py-0.5 pr-2"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-center text-2xl font-bold py-5">{codeText("stt03", language)}</h2>
          <Category.Table
            categories={categories}
            language={language}
            href={c => `/Portafolio/Category?cat=${c.id}`}
          />
        </div>
        <div className="flex flex-col sm:w-2/7">
          <h2 className="text-center w-full text-2xl font-bold py-5">{codeText("stt01", language)}</h2>
          <Language.List
            className="flex flex-wrap justify-center"
            href={l => `/Portafolio/Language?lan=${l.name}`}
            languages={languages}
            buttonClassName="flex m-1 justify-center p-2.5"
            size={30}
            hoverSize={40}
          />
        </div>
      </div>
    </>
  )
}

export default App