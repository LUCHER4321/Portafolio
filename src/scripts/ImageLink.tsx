const defaultImage = "https://svgsilh.com/svg_v2/1873373.svg";

interface ImageLinkProps {
    link: string;
    image?: string;
    height?: number;
}

export const ImageLink = ({link, image = undefined, height = 128}: ImageLinkProps) => {
    return (
        <a href={link} target="_blank" className="flex justify-center">
            <img style={{height: height, aspectRatio: '1/1'}} src={image ?? defaultImage}/>
        </a>
    );
}