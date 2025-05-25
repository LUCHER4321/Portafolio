export const Loading = ({ height }: LoadingProps) => {
    return (
        <div className="flex justify-center items-center w-full">
            <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-18-223_512.gif" alt="Loading..." style={{ height, width: height }}/>
        </div>
    );
};

interface LoadingProps {
    height: number;
}