import { useSearchParams } from "react-router-dom";
import { Project } from "../classes/Project";
import { projects } from "../data/projects";
import { useState } from "react";
import { codeText } from "../functions/translate";
import { NavBar } from "../components/NavBar";

export const LanguagePage = () => {
    const [language, setLanguage] = useState("spanish");
    const [searchParams] = useSearchParams();
    const lan = searchParams.get("lan") || "";
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage}/>
            <h1>{codeText("ttl01", language, [lan])}</h1>
            <div className="flex justify-center mt-4">
                <Project.Table
                    projects={projects.filter(p => p.languages.includes(lan))}
                    language={language}
                    className="border-collapse"
                    thClassName="border border-solid px-2"
                    tdClassName="border border-solid p-2.5"
                />
            </div>
        </>
    )
};