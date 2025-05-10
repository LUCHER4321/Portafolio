import { useSearchParams } from "react-router-dom";
import { Project } from "../classes/Project";
import { codeText } from "../functions/translate";
import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { getProjects } from "../api/projects";

export const ProjectsPage = ({paramName, language, titleCode, titleParam}: projectsPageProps) => {
    const [searchParams] = useSearchParams();
    const par = searchParams.get(paramName) || "";
    const [title, setTitle] = useState(par);
    const [remoteProy, setRemoteProy] = useState<Project[]>([])
    useEffect(() => {
        titleParam?.(par).then(setTitle);
        getUser().then(u => getProjects({
            user: u.id,
            lan: par === "lan" ? par : undefined,
            cat: par === "cat" ? par : undefined,
        }).then(
            P => setRemoteProy(
                P.map(
                    p => new Project(p)
                )
            )
        ));
    }, []);
    return (
        <>
            <div className="flex flex-col justify-center mt-8">
                <h1>{codeText(titleCode, language, [title])}</h1>
                <Project.List
                    language={language}
                    projects={remoteProy}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mt-8"
                />
            </div>
        </>
    )
};

interface projectsPageProps {
    paramName: string;
    titleCode: string;
    titleParam?: (param: string) => Promise<string>;
    language: string;
}