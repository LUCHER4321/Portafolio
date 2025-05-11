import { Project } from "../classes/Project";
import { codeText } from "../functions/translate";
import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { getProjects } from "../api/projects";
import { useParams } from "react-router-dom";

export const ProjectsPage = ({language, titleCode, titleParam}: projectsPageProps) => {
    const [remoteProy, setRemoteProy] = useState<Project[]>([]);
    const params = useParams();
    const { lan, cat } = params
    useEffect(() => {
        getUser().then(u => getProjects({
            user: u.id,
            lan,
            cat
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
                <h1>{codeText(titleCode, language, [titleParam])}</h1>
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
    language: string;
    titleCode: string;
    titleParam: string;
}