import {HiPlay} from "react-icons/hi2";

const PlayButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className={"flex justify-center items-center w-12 min-w-12 h-12 rounded-full" +
            " bg-surface-100-900 shadow-sm cursor-pointer border-surface-200-800 border"}
             onClick={onClick}>
            <HiPlay className={"h-2/3 w-2/3 text-primary-900-100"}/>
        </div>
    );
};

export default PlayButton;