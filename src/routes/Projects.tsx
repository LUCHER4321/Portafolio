import { useSearchParams } from "react-router-dom";
import { Project } from "../classes/Project";
import { projects } from "../data/projects";
import { codeText } from "../functions/translate";

export const ProjectsPage = ({paramName, projectFilter, language, titleCode, titleParam}: projectsPageProps) => {
    const [searchParams] = useSearchParams();
    const par = searchParams.get(paramName) || "";
    return (
        <div className="flex flex-col justify-center mt-8">
            <h1>{codeText(titleCode, language, [titleParam?.(par) ?? par])}</h1>
            <Project.List
                language={language}
                projects={projects.filter(p => projectFilter(p).includes(par))}
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mt-8"
            />
        </div>
    )
};

interface projectsPageProps {
    paramName: string;
    titleCode: string;
    titleParam?: (param: string) => string;
    projectFilter: (project: Project) => string[];
    language: string;
}