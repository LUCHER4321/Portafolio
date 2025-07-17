import { useEffect, useState } from "react";
import { codeTextAlt } from "../functions/translate";
import { NavBar } from "../components/NavBar";
import { PersonalLink } from "../classes/PersonalLink";
import { links } from "../data/links";

export const LinkTree = () => {
    const [language, setLanguage] = useState(localStorage.getItem("language") ?? "spanish");
    useEffect(() => {
        localStorage.setItem("language", language);
        codeTextAlt("ttl00", language).then(ttl => document.title = ttl);
    }, [language]);
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[new PersonalLink("spanish:Portafolio;english:Portfolio", "/Portafolio", "/Portafolio/icon.png")].concat(...links).map((l, index) =>
                    <a key={index} className="flex flex-row items-center text-red-100! bg-indigo-800 rounded-full" href={l.link}>
                        <img src={l.logo} className="h-12! m-4 rounded-full" />
                        {l.name.get(language) ?? [...l.name.values()][0]}
                    </a>)}
            </div>
        </>
    )
};