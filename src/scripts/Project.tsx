import { CustomTable } from "./CustomTable";
import { ImageLink } from "./ImageLink";
import { Language } from "./Language";
import { languages } from "../data/languages";

export class Project {
    name: string;
    repository: string;
    website?: string;
    icon?: string;
    languages: string[] = [];

    private static GitHubLogo = "https://logo.clearbit.com/github.com";

    constructor(name: string, repository: string, website: string | undefined = undefined, icon: string | undefined = undefined, ...languages: string[]) {
        this.name = name;
        this.repository = repository;
        this.website = website;
        this.icon = icon;
        this.languages = languages;
    }

    static Table({projects, className, height, thClassName, tdClassName, languageFilter, lanHeight}: tableProps) {
        return(
            <CustomTable
                headers={["Proyecto", "Repositorio", "Lenguajes", "Sitio Web"]}
                data={languageFilter ? projects.filter(p => {
                    for(const l of languageFilter){
                        if(p.languages.includes(l.name)) return true;
                    }
                    return false;
                }) : projects}
                row={p => p ? [
                    p.name,
                    <ImageLink
                        link={p.repository}
                        image={Project.GitHubLogo}
                        height={height}
                    />,
                    <Language.List
                        languages={languages.filter(l => p.languages.includes(l.name))}
                        className="flex flex-wrap"
                        height={lanHeight}
                    />, //lang.get(p)?.join(", ") ?? "...",
                    p.website && <ImageLink
                        link={p.website}
                        image={p.icon}
                        height={height}
                    />
                ] : []}
                className={className}
                thClassName={thClassName}
                tdClassName={tdClassName}
            />
        );
    }
}

interface tableProps {
    projects: Project[];
    height?: number;
    className?: string;
    thClassName?: string;
    tdClassName?: string;
    languageFilter?: Language[];
    lanHeight?: number;
}