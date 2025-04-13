import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { ProjectsPage } from "../components/Projects";
import { ContactForm } from "../components/ContactFrom";

export const LanguagePage = () => {
    const [language, setLanguage] = useState("spanish");
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage}/>
            <ProjectsPage
                paramName="lan"
                titleCode="ttl01"
                projectFilter={p => p.languages.map(l => l.name)}
                language={language}
            />
            <ContactForm language={language}/>
        </>
    )
};