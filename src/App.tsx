import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { projects } from './data/projects'
import { Project } from './scripts/Project'
import { PersonalLink } from './scripts/PersonalLink';
import { links } from './data/links';
import { Language } from './scripts/Language';
import { languages } from './data/languages';
import { codeText, getLanguageOptions } from './scripts/translate';

function App() {
  const [language, setLanguage] = useState("spanish");
  const [languageFilter, setLanguageFilter] = useState(languages);
  const trLanguages = getLanguageOptions();

  const addLanguage = (l: Language) => {
    setLanguageFilter(languageFilter.concat([l]));
  };

  const quitLanguage = (l: Language) => {
    setLanguageFilter(languageFilter.filter(lan => lan !== l));
  };

  const toggleLanguage = (l: Language) => {
    if(languageFilter.includes(l)){
      quitLanguage(l);
    }
    else{
      addLanguage(l);
    }
  }

  const allLanguages = () => {
    setLanguageFilter(languages);
  }

  const noLanguages = () => {
    setLanguageFilter([]);
  }

  return (
    <>
      <div className="text-end mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white dark:bg-[#242424] rounded"
        >
          {Array.from(trLanguages).map(([key, value], index) => (
            <option value={key} key={index}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <h1>{codeText("ttl00", language)}</h1>
      <h2 className="text-start text-2xl font-bold py-5">{codeText("stt00", language)}</h2>
      <PersonalLink.Table
        language={language}
        links={links}
        height={24}
        tdClassName="text-start py-0.5 pr-2"
      />
      <h2 className="text-start text-2xl font-bold py-5">{codeText("stt01", language)}</h2>
      <div className="flex flex-row">
        <button onClick={allLanguages} className="mr-2 bg-green-500">{codeText("btn00", language)}</button>
        <button onClick={noLanguages} className="bg-red-500">{codeText("btn01", language)}</button>
      </div>
      <Language.List
        className="flex flex-wrap"
        languages={languages}
        onClick={toggleLanguage}
        buttonClassName={l => `mr-2 mt-2 bg-${languageFilter.includes(l) ? "green" : "red" }-500`}
        height={30}
      />
      <h2 className="text-start text-2xl font-bold py-5">{codeText("stt02", language)}</h2>
      <Project.Table
        language={language}
        projects={projects}
        languageFilter={languageFilter}
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