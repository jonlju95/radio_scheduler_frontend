import {HiBackward, HiForward, HiPause, HiPlay, HiSpeakerWave} from "react-icons/hi2";
import {useEffect, useState} from "react";
import {cn} from "../../utils/cn.ts";


const PlayerControls = ({currentShow}: { currentShow: string }) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

    useEffect(() => {
        const target = document.querySelector("#scroll-container");

        if (!target) return;

        const handleScroll = () => {
            const scrollTop = target.scrollTop;
            const visibleHeight = target.clientHeight;
            const scrollHeight = target.scrollHeight;

            const distanceFromBottom = scrollHeight - (scrollTop + visibleHeight);

            setIsAtBottom(distanceFromBottom < 96);
        };

        target.addEventListener("scroll", handleScroll);
        return () => target.removeEventListener("scroll", handleScroll);
    }, []);

    const togglePlaying = () => {
        setPlaying(!playing);
    }

    return (
        <div className={cn("absolute w-[80%] z-9999 bg-primary-200-800 border border-surface-200-800 px-6 py-3" +
            " rounded-xl left-1/2 transform -translate-x-1/2 transition-[bottom,transform] duration-75 ease-in-out",
            isAtBottom ? "bottom-24 translate-y-0" : "bottom-6 translate-y-0")}>
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
            <div className={"w-full h-4 flex justify-between items-center"}>
                <div className={"flex w-20 me-4 justify-center items-center"}>
                    <p>-- : --</p>
                </div>
                <input className={"w-full h-1.5 rounded-sm outline-none appearance-none bg-secondary-200-800"}
                       type={"range"} min={"1"} max={"100"} defaultValue={"33"}/>
                <div className={"flex w-20 ms-4 bg-primary-400-600 text-surface-50-950 rounded-sm justify-center"}>
                    <p className={"font-bold flex items-center"}><span>LIVE</span>
                        <circle className={"bg-surface-50-950 block w-3 h-3 rounded-xl ms-2"}/>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlayerControls;