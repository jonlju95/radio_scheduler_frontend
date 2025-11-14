import {HiPlay} from "react-icons/hi2";
import {usePlayerControls} from "../../contexts/playerControls/UsePlayerControls.tsx";

const PodcastItem = ({ title, description, imageSrc, imageAlt }: {
    title: string,
    description: string,
    imageSrc: string,
    imageAlt: string
}) => {
    const { showControls } = usePlayerControls();

    return (
        <div className={"rounded-xl flex flex-col"}>
            <div className={"relative min-h-64"}>
                <img src={imageSrc} alt={imageAlt} className={"w-full rounded-t-xl"}/>
                <div className={"flex justify-center items-center absolute bottom-6 right-6 w-12 h-12 rounded-full" +
                    " bg-surface-100-900 border-surface-200-800 shadow-sm cursor-pointer"}
                onClick={() => showControls(title)}>
                    <HiPlay className={"h-2/3 w-2/3 text-primary-900-100"}/>
                </div>
            </div>
            <div className={"p-3"}>
                <h5>{title}</h5>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default PodcastItem;