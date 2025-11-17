import {usePlayerControls} from "../../contexts/playerControls/UsePlayerControls.tsx";
import {HiPlay} from "react-icons/hi2";

const NowPlayingContainer = ({title, description, imageSrc, imageAlt}: {
    title: string,
    description: string,
    imageSrc: string,
    imageAlt: string
}) => {
    const {showControls} = usePlayerControls();

    return (
        <div className={"bg-surface-100-900 mb-6 p-6 rounded-xl shadow-md"}>
            <div className={"flex justify-between items-center mb-4"}>
                <h3>Now playing</h3>
                <div className={"flex justify-center items-center w-12 min-w-12 h-12 rounded-full" +
                    " bg-surface-100-900 shadow-sm cursor-pointer border-surface-200-800 border"}
                     onClick={() => showControls(title)}>
                    <HiPlay className={"h-2/3 w-2/3 text-primary-900-100"}/>
                </div>
            </div>
            <div className={"flex"}>
                <img src={imageSrc} alt={imageAlt} className={"w-1/2 rounded-xl me-4"}/>
                <div className={"flex flex-col w-1/2"}>
                    <h6>{title}</h6>
                    <p className={"mt-4"}>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default NowPlayingContainer;