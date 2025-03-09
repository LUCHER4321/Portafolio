import { CustomTable } from "./CustomTable";
import { ImageLink } from "./ImageLink";
import { Language } from "./Language";
import { languages } from "../data/languages";
import { codeText } from "./translate";

export class Project {
    name: Map<string,string>;
    repository: string;
    website?: string;
    icon?: string;
    languages: string[] = [];

    private static GitHubLogo = "https://logo.clearbit.com/github.com";

    constructor(name: string, repository: string, website: string | undefined = undefined, icon: string | undefined = undefined, ...languages: string[]) {
        this.name = new Map(name.split(";").map(s => [s.split(":")[0], s.split(":")[1]]));
        this.repository = repository;
        this.website = website;
        this.icon = icon;
        this.languages = languages;
    }

    static Table({projects, className, height, thClassName, tdClassName, languageFilter, lanHeight, language}: tableProps) {
        return(
            <CustomTable
                headers={["00", "01", "02", "03"].map(n => codeText("hdr" + n, language) ?? "")}
                data={languageFilter ? projects.filter(p => {
                    for(const l of languageFilter){
                        if(p.languages.includes(l.name)) return true;
                    }
                    return false;
                }) : projects}
                row={p => p ? [
                    p.name.get(language) ?? [...p.name.values()][0],
                    <ImageLink
                        link={p.repository}
                        image={Project.GitHubLogo}
                        height={height}
                    />,
                    <Language.List
                        languages={languages.filter(l => p.languages.includes(l.name))}
                        className="flex flex-wrap"
                        height={lanHeight}
                    />,
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
    language: string;
}