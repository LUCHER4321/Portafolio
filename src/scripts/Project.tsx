import { CustomTable } from "./CustomTable";
import { ImageLink } from "./ImageLink";
import { Language } from "./Language";
import { languages } from "../data/languages";
import { codeText } from "./translate";
import { Category } from "./Category";
import { categories } from "../data/categories";

export class Project {
    name: Map<string,string>;
    categories: Category[];
    repository: string;
    website?: string;
    icon?: string;
    languages: string[] = [];

    private static GitHubLogo = "https://logo.clearbit.com/github.com";

    constructor(name: string, categoryIDs: string[], repository: string, website: string | undefined = undefined, icon: string | undefined = undefined, ...languages: string[]) {
        this.name = new Map(name.split(";").map(s => [s.split(":")[0], s.split(":")[1]]));
        this.categories = categories.filter(c => categoryIDs.includes(c.id));
        this.repository = repository;
        this.website = website;
        this.icon = icon;
        this.languages = languages;
    }

    static Table({projects, className, height = 50, hoverHeight = 55, thClassName, tdClassName, languageFilter, lanSize = 20, hoverSize = 25, language}: tableProps) {
        const filteredProjects = languageFilter ? projects.filter(p => {
            for(const l of languageFilter){
                if(p.languages.includes(l.name)) return true;
            }
            return false;
        }) : projects
        const web = filteredProjects.filter(p => p.website).length > 0;
        return(
            <CustomTable
                headers={["00", "01", "02"].concat(web ? ["03"] : []).map(n => codeText("hdr" + n, language) ?? "")}
                data={filteredProjects}
                row={p => ([
                    p.name.get(language) ?? [...p.name.values()][0],
                    <ImageLink
                        link={p.repository}
                        image={Project.GitHubLogo}
                        height={height}
                        hoverHeight={hoverHeight}
                    />,
                    <Language.List
                        languages={languages.filter(l => p.languages.includes(l.name))}
                        className="flex flex-wrap"
                        href={l => `/Portafolio/Language?lan=${l.name}`}
                        size={lanSize}
                        hoverSize={hoverSize}
                        buttonClassName="mx-0.5"
                    />
                ] as any[]).concat(web ? [p.website &&
                    <ImageLink
                        link={p.website}
                        image={p.icon}
                        height={height}
                        hoverHeight={hoverHeight}
                    />
                ] : [])}
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
    hoverHeight?: number;
    className?: string;
    thClassName?: string;
    tdClassName?: string;
    languageFilter?: Language[];
    lanSize?: number;
    hoverSize?: number;
    language: string;
}