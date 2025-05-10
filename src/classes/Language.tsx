import { ImageLink } from "../components/ImageLink";
import { LanguageDTO } from "../types";

export class Language {
    id: number;
    name: string;
    image: string;

    constructor(dto: LanguageDTO) {
        this.id = dto.id
        this.name = dto.name;
        this.image = dto.image;
    }

    static List({languages, href, size, hoverSize, className, buttonClassName, imgClassName}: languageListProps) {
        const finalSize = (item: Language, hover: boolean = false) => hover ? (typeof hoverSize === "number" ? hoverSize : hoverSize?.(item)) : (typeof size === "number" ? size : size?.(item));
        const Image = ({item}: {item: Language}) => <img style={{height: finalSize(item),}} src={item.image} className={typeof imgClassName === 'string' ? imgClassName : imgClassName?.(item)} alt={item.name}/>;
        return(<div className={className}>
            {languages.map((item, index) =>
                href ?
                <ImageLink
                    link={href(item)}
                    key={index}
                    image={item.image}
                    height={finalSize(item)}
                    hoverHeight={finalSize(item, true)}
                    className={typeof buttonClassName === 'string' ? buttonClassName : buttonClassName?.(item)}
                    blank={false}
                />:
                <Image item={item} key={index}/>
            )}
        </div>);
    }
}

interface languageListProps {
    languages: Language[];
    href?: (lan: Language) => string;
    size?: number | ((lan: Language) => number);
    hoverSize?: number | ((lan: Language) => number);
    className?: string;
    buttonClassName?: string | ((lan: Language) => string);
    imgClassName?: string | ((lan: Language) => string);
}