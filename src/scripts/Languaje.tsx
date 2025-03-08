export class Languaje {
    name: string;
    image: string;

    constructor(name: string, image: string) {
        this.name = name;
        this.image = image;
    }

    static List({languajes, onClick, height, className, buttonClassName, imgClassName}: languageListProps) {
        const Image = ({item}: {item: Languaje}) => <img style={{height: typeof height === "number" ? height : height?.(item)}} src={item.image} className={typeof imgClassName === 'string' ? imgClassName : imgClassName?.(item)} alt={item.name}/>;
        return(<div className={className}>
            {languajes.map((item, index) =>
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
    languajes: Languaje[];
    onClick?: (lan: Languaje) => void;
    height?: number | ((lan: Languaje) => number);
    className?: string;
    buttonClassName?: string | ((lan: Languaje) => string);
    imgClassName?: string | ((lan: Languaje) => string);
}