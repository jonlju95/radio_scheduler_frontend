import {HiBackward, HiForward, HiPause, HiPlay, HiSpeakerWave} from "react-icons/hi2";
import {useState} from "react";


const PlayerControls = ({currentShow}: { currentShow: string }) => {
    const [playing, setPlaying] = useState<boolean>(false);

    const togglePlaying = () => {
        setPlaying(!playing);
    }

    return (
        <div className={"absolute w-[80%] z-9999 bg-primary-200-800 border border-surface-200-800 px-6 py-3" +
            " rounded-xl bottom-8 left-1/2 transform -translate-1/2"}>
            <div className={"flex items-center justify-between w-full mb-3"}>
                <p className={"min-w-1/4"}>
                    <span className={"font-bold"}>Now playing: </span>
                    <span>{currentShow}</span>
                </p>
                <div className={"flex items-center justify-center w-full"}>
                    <HiBackward className={"w-12 h-12 flex items-center justify-center bg-surface-50-950 border" +
                        " border-surface-100-900 rounded-3xl cursor-pointer shadow-sm p-1.5"}/>
                    {playing && (
                        <HiPlay className={"w-16 h-16 flex items-center justify-center bg-surface-50-950 border" +
                            " border-surface-100-900 rounded-4xl cursor-pointer shadow-sm p-2 mx-6"}
                                onClick={togglePlaying}/>
                    ) || (
                        <HiPause className={"w-16 h-16 flex items-center justify-center bg-surface-50-950 border" +
                            " border-surface-100-900 rounded-4xl cursor-pointer shadow-sm p-2 mx-6"}
                                 onClick={togglePlaying}/>
                    )}
                    <HiForward className={"w-12 h-12 flex items-center justify-center bg-surface-50-950 border" +
                        " border-surface-100-900 rounded-3xl cursor-pointer shadow-sm p-1.5"}/>
                </div>
                <div className={"min-w-1/4 flex justify-end"}>
                    <HiSpeakerWave className={"w-12 h-12 flex items-center justify-center bg-surface-50-950 border" +
                        " border-surface-100-900 rounded-3xl cursor-pointer shadow-sm p-1.5"}/>
                </div>
            </div>
            <div className={"w-full h-4 flex items-center"}>
                <input className={"w-full h-1.5 rounded-sm outline-none appearance-none bg-secondary-200-800"}
                       type={"range"} min={"1"} max={"100"} defaultValue={"33"}/>
            </div>
            {/*<progress className={"w-full h-1.5 rounded-sm"} max={"100"} value={"33"}>33%</progress>*/}
        </div>
    );
};

export default PlayerControls;