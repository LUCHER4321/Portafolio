import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import { NavBar } from "../scripts/NavBar";
import { Project } from "../scripts/Project";
import { projects } from "../data/projects";
import { codeText } from "../scripts/translate";
import { categories } from "../data/categories";
import { Category } from "../scripts/Category";

export const CategoryPage = () => {
    const [language, setLanguage] = useState("spanish");
    const [searchParams] = useSearchParams();
    const cat = searchParams.get("cat") || "";
    const category = categories.find(c => c.id === cat) ?? new Category(cat, cat);
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage}/>
            <h1>{codeText("ttl02", language, [category.name.get(language) ?? ""])}</h1>
            <div className="flex justify-center mt-4">
                <Project.Table
                    projects={projects.filter(p => p.categories.includes(category))}
                    language={language}
                    height={50}
                    hoverHeight={55}
                    lanSize={20}
                    className="border-collapse"
                    thClassName="border border-solid px-2"
                    tdClassName="border border-solid p-2.5"
                />
            </div>
        </>
    )
}