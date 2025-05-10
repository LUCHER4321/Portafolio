import { useState } from "react"
import { NavBar } from "../components/NavBar";
import { ProjectsPage } from "../components/Projects";
import { ContactForm } from "../components/ContactFrom";
import { getCategory } from "../api/categories";

export const CategoryPage = () => {
    const [language, setLanguage] = useState("spanish");
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage}/>
            <ProjectsPage
                paramName="cat"
                titleCode="ttl02"
                titleParam={async (cat) => (await getCategory(cat)).name.find(n => n.translation === language)?.name ?? ""}
                language={language}
            />
            <ContactForm language={language}/>
        </>
    )
}