import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { ProjectsPage } from "../components/Projects";
import { ContactForm } from "../components/ContactFrom";
import { useParams } from "react-router-dom";

export const LanguagePage = () => {
    const [language, setLanguage] = useState("spanish");
    const { lan } = useParams();
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage}/>
            <ProjectsPage
                titleCode="ttl01"
                titleParam={lan ?? ""}
                language={language}
            />
            <ContactForm language={language}/>
        </>
    )
};