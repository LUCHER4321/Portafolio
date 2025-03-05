import { ImageLink } from "./ImageLink";

export class Project {
    name: string;
    repository: string;
    website?: string;
    logo?: string;

    private static GitHubLogo = "https://logo.clearbit.com/github.com";

    constructor(name: string, repository: string, website: string | undefined = undefined, logo: string | undefined = undefined) {
        this.name = name;
        this.repository = repository;
        this.website = website;
        this.logo = logo;
    }

    private Row = ({height, style}: tableProps) => {
        return (
            <tr>
                <td style={style}>{this.name}</td>
                <td style={style}>
                    <ImageLink
                        link={this.repository}
                        image={Project.GitHubLogo}
                        height={height}
                    />
                </td>
                <td style={style}>
                    {this.website && <ImageLink
                        link={this.website}
                        image={this.logo}
                        height={height}
                    />}
                </td>
            </tr>
        );
    }

    private static Header = ({style}: tableProps) => {
        return (
            <tr>
                <th style={style}>Nombre</th>
                <th style={style}>Repositorio</th>
                <th style={style}>Sitio Web</th>
            </tr>
        );
    }

    static Table({projects, style, height, thStyle, tdStyle}: tableProps) {
        return(
            <table style={style}>
                <thead>
                    <Project.Header style={thStyle}/>
                </thead>
                <tbody>
                    {projects?.map((item, index) => (
                        <item.Row height={height} key={index} style={tdStyle}/>
                    ))}
                </tbody>
            </table>
        )
    }
}

interface tableProps {
    projects?: Project[];
    height?: number;
    style?: React.CSSProperties;
    thStyle?: React.CSSProperties;
    tdStyle?: React.CSSProperties;
}