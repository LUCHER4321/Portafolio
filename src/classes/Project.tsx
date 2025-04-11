import { CustomTable } from "../components/CustomTable";
import { ImageLink } from "../components/ImageLink";
import { Language } from "./Language";
import { languages } from "../data/languages";
import { codeText } from "../functions/translate";
import { Category } from "./Category";
import { categories } from "../data/categories";

export class Project {
    name: Map<string,string>;
    description: Map<string,string>;
    categories: Category[];
    repository: string;
    website?: string;
    icon?: string;
    languages: Language[] = [];

    private static GitHubLogo = "https://logo.clearbit.com/github.com";

    constructor(name: string, description: string, categoryIDs: string[], repository: string, website: string | undefined = undefined, icon: string | undefined = undefined, ...languageNames: string[]) {
        this.name = new Map(name.split(";").map(s => [s.split(":")[0], s.split(":")[1]]));
        this.description = new Map(description.split(";").map(s => [s.split(":")[0], s.split(":")[1]]));
        this.categories = categories.filter(c => categoryIDs.includes(c.id));
        this.repository = repository;
        this.website = website;
        this.icon = icon;
        this.languages = languages.filter(l => languageNames.includes(l.name));
    }

    private static Display({project, language, lanSize, hoverSize}: tableProps) {
        const categories = project?.categories.length ?? 0;
        return(
            <div className="flex flex-col p-3 rounded justify-around" style={{
                backgroundImage: "url('https://www.dewais.com/wp-content/themes/dewais/assets/src/img/services/background.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <h2>{project?.name.get(language) ?? [...(project?.name.values() ?? [])][0]}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <h3>{codeText("hdr01", language)}</h3>
                    <ImageLink
                        link={project?.repository ?? ""}
                        image={Project.GitHubLogo}
                        height={lanSize}
                        hoverHeight={hoverSize}
                        className="sm:hidden"
                    />
                    <h3>{project?.website ? codeText("hdr03", language) : ""}</h3>
                    <ImageLink
                        link={project?.repository ?? ""}
                        image={Project.GitHubLogo}
                        height={lanSize}
                        hoverHeight={hoverSize}
                        className="hidden sm:flex"
                    />
                    {project?.website &&
                    <ImageLink
                        link={project?.website ?? ""}
                        image={project?.icon}
                        height={lanSize}
                        hoverHeight={hoverSize}
                    />}
                    <h3>{categories > 0 ? codeText("hdr04" + (categories > 1 ? "_p" : ""), language) : ""}</h3>
                    {categories > 0 && <Category.List
                        categories={project?.categories ?? []}
                        href={c => `/Portafolio/Category?cat=${c.id}`}
                        language={language}
                        className="flex flex-wrap justify-center sm:hidden"
                        size={lanSize}
                        hoverSize={hoverSize}
                        buttonClassName="mx-0.5"
                    />}
                    <h3>{codeText("hdr02", language)}</h3>
                    {categories > 0 && <Category.List
                        categories={project?.categories ?? []}
                        href={c => `/Portafolio/Category?cat=${c.id}`}
                        language={language}
                        className="flex flex-wrap justify-center hidden sm:flex"
                        size={lanSize}
                        hoverSize={hoverSize}
                        buttonClassName="mx-0.5"
                    />}
                    <Language.List
                        languages={languages.filter(l => project?.languages.includes(l))}
                        href={l => `/Portafolio/Language?lan=${l.name}`}
                        className="flex flex-wrap justify-center"
                        size={lanSize}
                        hoverSize={hoverSize}
                        buttonClassName="mx-0.5"
                    />
                </div>
            </div>
        );
    }

    static List({projects, className, language, lanSize = 24, hoverSize = 32}: tableProps) {
        return(
            <div className={className}>
                {projects?.map((p, i) => (
                    <Project.Display
                        key={i}
                        project={p}
                        language={language}
                        lanSize={lanSize}
                        hoverSize={hoverSize}
                    />
                ))}
            </div>
        )
    }

    static Table({projects, className, height = 50, hoverHeight = 51, thClassName, tdClassName, languageFilter, lanSize = 20, hoverSize = 25, language}: tableProps) {
        const filteredProjects = languageFilter ? projects?.filter(p => {
            for(const l of languageFilter){
                if(p.languages.includes(l)) return true;
            }
            return false;
        }) : projects
        const web = (filteredProjects?.filter(p => p.website).length ?? 0) > 0;
        return(
            <CustomTable
                headers={["00", "01", "02"].concat(web ? ["03"] : []).map(n => codeText("hdr" + n, language) ?? "")}
                data={filteredProjects ?? []}
                row={p => ([
                    p.name.get(language) ?? [...p.name.values()][0],
                    <ImageLink
                        link={p.repository}
                        image={Project.GitHubLogo}
                        height={height}
                        hoverHeight={hoverHeight}
                    />,
                    <Language.List
                        languages={languages.filter(l => p.languages.includes(l))}
                        className="flex flex-wrap justify-center"
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
    projects?: Project[];
    project?: Project;
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