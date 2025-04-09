const defaultImage = "https://svgsilh.com/svg_v2/1873373.svg";

interface ImageLinkProps {
    link: string;
    image?: string;
    height?: number;
    className?: string;
    blank?: boolean;
}

export const ImageLink = ({link, image = undefined, height = 128, className, blank = true}: ImageLinkProps) => {
    return (
        <a href={link} target={blank ? "_blank" : "_self"} className={"flex justify-center items-center" + (className ? " " + className : "")}>
            <img style={{height: height, aspectRatio: '1/1'}} src={image ?? defaultImage}/>
        </a>
    );
}