import { ImageLink } from "./ImageLink";

export class PersonalLink {
    name: string;
    link: string;
    logo?: string;

    constructor(name: string, link: string, logo: string | undefined = undefined) {
        this.name = name;
        this.link = link;
        this.logo = logo;
    }
    
    private Row = ({height, style}: tableProps) => {
        return (
            <tr>
                <td style={style}>{this.name}:</td>
                <td style={style}>
                    <ImageLink
                        link={this.link}
                        image={this.logo}
                        height={height}
                    />
                </td>
            </tr>
        );
    }
    
    static Table({links, style, height, tdStyle}: tableProps) {
        return(
            <table style={style}>
                <tbody>
                    {links?.map((item, index) => (
                        <item.Row height={height} key={index} style={tdStyle}/>
                    ))}
                </tbody>
            </table>
        )
    }
}

interface tableProps {
    links?: PersonalLink[];
    height?: number;
    style?: React.CSSProperties;
    tdStyle?: React.CSSProperties;
}