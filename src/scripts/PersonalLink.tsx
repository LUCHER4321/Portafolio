import { CustomTable } from "./CustomTable";
import { ImageLink } from "./ImageLink";

export class PersonalLink {
    name: Map<string,string>;
    link: string;
    logo?: string;

    constructor(name: string, link: string, logo: string | undefined = undefined) {
        this.name = new Map(name.split(";").map(s => [s.split(":")[0], s.split(":")[1]]));
        this.link = link;
        this.logo = logo;
    }
    
    static Table({links, className, height, hoverHeight, tdClassName, language}: tableProps) {
        return (
            <CustomTable
                data={links ?? []}
                row={l => [
                   ( l.name.get(language) ?? [...l.name.values()][0]) + ":",
                    <ImageLink
                        link={l.link}
                        image={l.logo}
                        height={height}
                        hoverHeight={hoverHeight}
                    />
                ]}
                className={className}
                tdClassName={tdClassName}
            />
        );
    }
}

interface tableProps {
    links?: PersonalLink[];
    height?: number;
    hoverHeight?: number;
    className?: string;
    tdClassName?: string;
    language: string;
}