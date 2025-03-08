import { CustomTable } from "./CustomTable";
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
    
    static Table({links, className, height, tdClassName}: tableProps) {
        return (
            <CustomTable
                data={links ?? []}
                row={l => [
                    l.name + ":",
                    <ImageLink
                        link={l.link}
                        image={l.logo}
                        height={height}
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
    className?: string;
    tdClassName?: string;
}