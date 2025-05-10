import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { ProjectsPage } from "../components/Projects";
import { ContactForm } from "../components/ContactFrom";
import { getLanguage } from "../api/languages";

export const LanguagePage = () => {
    const [language, setLanguage] = useState("spanish");
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage}/>
            <ProjectsPage
                paramName="lan"
                titleCode="ttl01"
                titleParam={async (lan) => (await getLanguage(+lan)).name}
                language={language}
            />
            <ContactForm language={language}/>
        </>
    )
};