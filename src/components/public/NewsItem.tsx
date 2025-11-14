import {HiPlay} from "react-icons/hi2";
import {usePlayerControls} from "../../contexts/playerControls/UsePlayerControls.tsx";

const NewsItem = ({ title, description, imageSrc, imageAlt }: {
    title: string,
    description: string,
    imageSrc: string,
    imageAlt: string
}) => {
    const { showControls } = usePlayerControls();

    return (
        <div className={"rounded-xl pe-8 flex justify-between items-center bg-surface-100-900 max-h-48 mb-4" +
            " border-surface-400-600 shadow-sm"}>
            <div className={"flex h-full aspect-video"}>
                <img src={imageSrc} alt={imageAlt} className={"w-full rounded-l-xl"}/>
            </div>
            <div className={"p-4 w-full h-full"}>
                <h5>{title}</h5>
                <p>{description}</p>
            </div>
            <div className={"flex justify-center items-center w-12 min-w-12 h-12 rounded-full" +
                " bg-surface-100-900 shadow-sm cursor-pointer border-surface-200-800 border"}
                 onClick={() => showControls(title)}>
                <HiPlay className={"h-2/3 w-2/3 text-primary-900-100"}/>
            </div>
        </div>
    );
};

export default NewsItem;