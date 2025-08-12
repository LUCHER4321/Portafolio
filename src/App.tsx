import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { PersonalLink } from './classes/PersonalLink';
import { links } from './data/links';
import { Language } from './classes/Language';
import { codeText, codeTextAlt } from './functions/translate';
import { NavBar } from './components/NavBar';
import { Category } from './classes/Category';
import { ContactForm } from './components/ContactFrom';
import { getLanguages } from './api/languages';
import { getUser } from './api/user';
import { getCategories } from './api/categories';
import { Loading } from './components/Loading';

function App() {
  const [language, setLanguage] = useState(localStorage.getItem("language") ?? "spanish");
  const [remoteLan, setRemoteLan] = useState<Language[]>([]);
  const [remoteCat, setRemoteCat] = useState<Category[]>([]);
  useEffect(() => {
    getUser().then(
      u => {
        getLanguages({ user: u.id }).then(
          L => setRemoteLan(
            L.map(
              l => new Language(l)
            )
          )
        );
        getCategories({ user: u.id }).then(
          C => setRemoteCat(
            C.map(
              c => new Category(c)
            )
          )
        );
      }
    );
  }, []);
  useEffect(() => {
    localStorage.setItem("language", language);
    codeTextAlt("ttl00", language).then(ttl => document.title = ttl);
  }, [language]);

  return (
    <>
      <NavBar language={language} setLanguage={setLanguage}/>
      <div className="flex md:flex-row flex-col md:items-center md:justify-around w-full">
        <h1 className="align-middle md:w-1/5 w-full text-white">Luciano Hernández</h1>
        <div className="flex flex-col text-justify my-4 w-full md:w-3/5">
          {
            //<h2 className="text-white">{codeText("stt04", language)}</h2>
          }
          <p className="text-white">{codeText("prg00", language)}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:justify-around">
        <div className="flex flex-col">
          <h2 className="text-white">{codeText("stt00", language)}</h2>
          <PersonalLink.Table
            language={language}
            links={links}
            height={24}
            hoverHeight={32}
            tdClassName="text-start py-0.5 pr-2 text-white"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-white">{codeText("stt03", language)}</h2>
          {remoteCat.length > 0 ?
          <Category.Table
            categories={remoteCat}
            href={c => `/Portafolio/Category/${c.id}`}
            language={language}
            imgClassName="flex justify-center p-2.5"
            size={30}
            hoverSize={35}
            className="text-white"
          /> : <Loading height={80}/>}
        </div>
        <div className="flex flex-col sm:w-2/7">
          <h2 className="text-white">{codeText("stt01", language)}</h2>
          {remoteLan.length > 0 ?
          <Language.List
            languages={remoteLan}
            href={l => `/Portafolio/Language/${l.name}`}
            className="flex flex-wrap justify-center"
            buttonClassName="flex m-1 justify-center p-2.5"
            size={30}
            hoverSize={40}
          /> : <Loading height={80}/>}
        </div>
      </div>
      <ContactForm language={language}/>
    </>
  )
}

export default App