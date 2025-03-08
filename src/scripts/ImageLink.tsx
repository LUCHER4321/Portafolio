const defaultImage = "https://cdn-icons-png.flaticon.com/512/25/25284.png";

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