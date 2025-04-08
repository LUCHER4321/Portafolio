export class Language {
    name: string;
    image: string;

    constructor(name: string, image: string) {
        this.name = name;
        this.image = image;
    }

    static List({languages, onClick, href, size, className, buttonClassName, imgClassName}: languageListProps) {
        const finalSize = (item: Language) => typeof size === "number" ? size : size?.(item)
        const Image = ({item}: {item: Language}) => <img style={{height: finalSize(item),}} src={item.image} className={typeof imgClassName === 'string' ? imgClassName : imgClassName?.(item)} alt={item.name}/>;
        return(<div className={className}>
            {languages.map((item, index) =>
                onClick ?
                <button type="button" onClick={() => onClick(item)} key={index} className={typeof buttonClassName === 'string' ? buttonClassName : buttonClassName?.(item)}>
                    <Image item={item}/>
                </button> :
                href ?
                <a href={href(item)} key={index} className={typeof buttonClassName === 'string' ? buttonClassName : buttonClassName?.(item)}>
                    <Image item={item}/>
                </a> :
                <Image item={item} key={index}/>
            )}
        </div>);
    }
}

interface languageListProps {
    languages: Language[];
    onClick?: (lan: Language) => void;
    href?: (lan: Language) => string;
    size?: number | ((lan: Language) => number);
    className?: string;
    buttonClassName?: string | ((lan: Language) => string);
    imgClassName?: string | ((lan: Language) => string);
}