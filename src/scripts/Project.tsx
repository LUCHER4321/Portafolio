import { CustomTable } from "./CustomTable";
import { ImageLink } from "./ImageLink";

export class Project {
    name: string;
    repository: string;
    website?: string;
    icon?: string;

    private static GitHubLogo = "https://logo.clearbit.com/github.com";

    constructor(name: string, repository: string, website: string | undefined = undefined, icon: string | undefined = undefined) {
        this.name = name;
        this.repository = repository;
        this.website = website;
        this.icon = icon;
    }

    static Table({projects, style, height, thStyle, tdStyle}: tableProps) {
        return(
            <CustomTable
                headers={["Proyecto", "Repositorio", "Sitio Web"]}
                data={projects ?? []}
                row={p => p ? [
                    p.name,
                    <ImageLink
                        link={p.repository}
                        image={Project.GitHubLogo}
                        height={height}
                    />,
                    p.website && <ImageLink
                        link={p.website}
                        image={p.icon}
                        height={height}
                    />
                ] : []}
                style={style}
                thStyle={thStyle}
                tdStyle={tdStyle}
            />
        );
    }
}

interface tableProps {
    projects?: Project[];
    height?: number;
    style?: string;
    thStyle?: string;
    tdStyle?: string;
}