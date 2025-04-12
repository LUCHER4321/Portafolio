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
                    <h3 className={project?.website ? "" : "hidden sm:flex m-0!"}>{project?.website ? codeText("hdr03", language) : ""}</h3>
                    <ImageLink
                        link={project?.repository ?? ""}
                        image={Project.GitHubLogo}
                        height={lanSize}
                        hoverHeight={hoverSize}
                        className="hidden sm:flex"
                    />
                    <ImageLink
                        link={project?.website ?? ""}
                        image={project?.website ? project?.icon : ""}
                        height={lanSize}
                        hoverHeight={hoverSize}
                        className={project?.website ? "" : "hidden sm:flex"}
                    />
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
                    <h3>{codeText("hdr02" + ((project?.languages.length ?? 0) > 1 ? "_p" : ""), language)}</h3>
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