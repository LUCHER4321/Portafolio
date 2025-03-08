import { CustomTable } from "./CustomTable";
import { ImageLink } from "./ImageLink";
import { Languaje } from "./Languaje";
import { languajes } from "../data/languajes";

export class Project {
    name: string;
    repository: string;
    website?: string;
    icon?: string;
    languajes: string[] = [];

    private static GitHubLogo = "https://logo.clearbit.com/github.com";

    constructor(name: string, repository: string, website: string | undefined = undefined, icon: string | undefined = undefined, ...languages: string[]) {
        this.name = name;
        this.repository = repository;
        this.website = website;
        this.icon = icon;
        this.languajes = languages;
    }

    static Table({projects, className, height, thClassName, tdClassName, languajeFilter, lanHeight}: tableProps) {
        return(
            <CustomTable
                headers={["Proyecto", "Repositorio", "Lenguajes", "Sitio Web"]}
                data={languajeFilter ? projects.filter(p => {
                    for(const l of languajeFilter){
                        if(p.languajes.includes(l.name)) return true;
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
                    <Languaje.List
                        languajes={languajes.filter(l => p.languajes.includes(l.name))}
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
    languajeFilter?: Languaje[];
    lanHeight?: number;
}