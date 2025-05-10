import { CustomTable } from "../components/CustomTable";
import { ImageLink } from "../components/ImageLink";
export class Category {
    id: string;
    name: Map<string, string>;
    icon: string;

    constructor(id: string, name: string, icon: string) {
        this.id = id;
        this.name = new Map(name.split(";").map(s => [s.split(":")[0], s.split(":")[1]]));
        this.icon = icon;
    }

    static List({ categories, language, href, size, hoverSize, className, buttonClassName, imgClassName }: categoryListProps) {
        const finalSize = (item: Category, hover: boolean = false) => hover ? (typeof hoverSize === "number" ? hoverSize : hoverSize?.(item)) : (typeof size === "number" ? size : size?.(item));
        const Image = ({item}: {item: Category}) => <img style={{height: finalSize(item),}} src={item.icon} className={typeof imgClassName === 'string' ? imgClassName : imgClassName?.(item)} alt={item.name.get(language)}/>;
        return(
            <div className={className}>
                {categories.map((item, index) =>
                    href ?
                    <ImageLink
                        image={item.icon}
                        alt={item.name.get(language) ?? [...item.name.values()][0]}
                        link={href?.(item) ?? "/Portafolio"}
                        height={finalSize(item)}
                        hoverHeight={finalSize(item, true)}
                        className={typeof buttonClassName === 'string' ? buttonClassName : buttonClassName?.(item)}
                        blank={false}
                        key={index}
                    />:
                    <Image item={item} key={index}/>
                )}
            </div>
        );
    }

    static Table({ categories, tdClassName, language, href, size, hoverSize, className, imgClassName }: categoryListProps) {
        return (
            <CustomTable
                data={categories}
                row={c => [
                    <ImageLink
                        link={href?.(c) ?? "/Portafolio"}
                        image={c.icon}
                        height={typeof size === "number" ? size : size?.(c)}
                        hoverHeight={typeof hoverSize === "number" ? hoverSize : hoverSize?.(c)}
                        className={typeof imgClassName === "string" ? imgClassName : imgClassName?.(c)}
                    />,
                    c.name.get(language),
                ]}
                className={className}
                tdClassName={tdClassName}
            />
        );
    }
}

interface categoryListProps {
    categories: Category[];
    language: string;
    href?: (cat: Category) => string;
    size?: number | ((cat: Category) => number);
    hoverSize?: number | ((cat: Category) => number);
    className?: string;
    tdClassName?: string;
    buttonClassName?: string | ((cat: Category) => string);
    imgClassName?: string | ((cat: Category) => string);
}