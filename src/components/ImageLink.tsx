import { useState } from "react";

const defaultImage = "https://svgsilh.com/svg_v2/1873373.svg";

interface ImageLinkProps {
    link: string;
    image?: string;
    height?: number;
    className?: string;
    blank?: boolean;
    hoverHeight?: number;
    alt?: string;
}

export const ImageLink = ({link, image = undefined, height = 128, hoverHeight, className, blank = true, alt = ""}: ImageLinkProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const currentHeight = (isHovered && hoverHeight) ? hoverHeight : height;
    return (
        <a
            href={link}
            target={blank ? "_blank" : "_self"}
            className={`flex justify-center items-center ${className ? " " + className : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                style={{
                    height: currentHeight,
                    width: currentHeight,
                    transition: 'height 0.3s ease',
                }}
                src={image ?? defaultImage}
                alt={alt}
            />
        </a>
    );
}