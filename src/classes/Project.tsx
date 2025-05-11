import { ImageLink } from "../components/ImageLink";
import { Language } from "./Language";
import { codeText } from "../functions/translate";
import { Category } from "./Category";
import { ProjectDTO } from "../types";

export class Project {
    name: Map<string,string>;
    categories: Category[];
    repository: string;
    website?: string;
    icon?: string;
    languages: Language[] = [];

    private static GitHubLogo = "https://logo.clearbit.com/github.com";
    private static APKsFolder = "/Portafolio/APKs/";

    constructor(dto: ProjectDTO) {
        this.name = new Map(dto.name.map(n => [n.translation, n.name]));
        this.categories = dto.categories.map(c => new Category(c));
        this.repository = dto.repository;
        this.website = dto.website;
        this.icon = dto.icon;
        this.languages = dto.languages.map(l => new Language(l));
    }

    isAPK() {
        return this.website?.includes(Project.APKsFolder) ?? false;
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
                    <h3 className={project?.website ? "" : "hidden sm:flex m-0!"}>{project?.website ? codeText("hdr03" + (project.isAPK() ? "_d" : ""), language) : ""}</h3>
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
                        href={c => `/Portafolio/Category/${c.id}`}
                        language={language}
                        className="flex flex-wrap justify-center sm:hidden"
                        size={lanSize}
                        hoverSize={hoverSize}
                        buttonClassName="mx-0.5"
                    />}
                    <h3>{codeText("hdr02" + ((project?.languages.length ?? 0) > 1 ? "_p" : ""), language)}</h3>
                    {categories > 0 && <Category.List
                        categories={project?.categories ?? []}
                        href={c => `/Portafolio/Category/${c.id}`}
                        language={language}
                        className="flex flex-wrap justify-center hidden sm:flex"
                        size={lanSize}
                        hoverSize={hoverSize}
                        buttonClassName="mx-0.5"
                    />}
                    <Language.List
                        languages={project?.languages ?? []}
                        href={l => `/Portafolio/Language/${l.name}`}
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