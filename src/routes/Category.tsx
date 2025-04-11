import { useState } from "react"
import { NavBar } from "../components/NavBar";
import { categories } from "../data/categories";
import { ProjectsPage } from "../components/Projects";

export const CategoryPage = () => {
    const [language, setLanguage] = useState("spanish");
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage}/>
            <ProjectsPage
                paramName="cat"
                titleCode="ttl02"
                titleParam={cat => categories.find(c => c.id === cat)?.name.get(language) ?? ""}
                projectFilter={p => p.categories.map(c => c.id)}
                language={language}
            />
        </>
    )
}