export class Language {
    name: string;
    image: string;

    constructor(name: string, image: string) {
        this.name = name;
        this.image = image;
    }

    static List({languages, onClick, height, className, buttonClassName, imgClassName}: languageListProps) {
        const Image = ({item}: {item: Language}) => <img style={{height: typeof height === "number" ? height : height?.(item)}} src={item.image} className={typeof imgClassName === 'string' ? imgClassName : imgClassName?.(item)} alt={item.name}/>;
        return(<div className={className}>
            {languages.map((item, index) =>
                onClick ?
                <button type="button" onClick={() => onClick(item)} key={index} className={typeof buttonClassName === 'string' ? buttonClassName : buttonClassName?.(item)}>
                    <Image item={item}/>
                </button> :
                <Image item={item} key={index}/>
            )}
        </div>);
    }
}

interface languageListProps {
    languages: Language[];
    onClick?: (lan: Language) => void;
    height?: number | ((lan: Language) => number);
    className?: string;
    buttonClassName?: string | ((lan: Language) => string);
    imgClassName?: string | ((lan: Language) => string);
}