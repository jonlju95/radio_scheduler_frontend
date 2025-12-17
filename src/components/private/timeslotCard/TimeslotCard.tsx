import {HiPencil} from "react-icons/hi2";
import type {RadioHost} from "../../../models/RadioHost.ts";


const TimeslotCard = ({ startTime, showTitle, studioName, hosts, onClickAction }: {
    startTime?: string;
    showTitle?: string;
    studioName?: string;
    hosts?: RadioHost[];
    onClickAction?: () => void;
}) => {
    return (
        <div className={"flex items-end w-full pb-2 border-b border-dashed border-surface-400-600"}>
            <p>{startTime}</p>
            <div className={"flex items-center justify-between w-full bg-secondary-300-700 border-secondary-400-600 border" +
                " rounded-lg p-3 ms-6"}>
                <div className={"flex w-full"}>
                    <div className={"min-w-16 w-1/4"}>
                        <h6>{showTitle}</h6>
                        <p>{studioName}</p>
                    </div>
                    <div className={"flex flex-col justify-center"}>
                        {hosts?.map((host) => (
                            <p>{host.firstName + ' ' + host.lastName}</p>
                        ))}
                    </div>
                </div>
                <div className={"cursor-pointer flex justify-center items-center h-8 w-8" +
                    " bg-surface-50-950 rounded-full shadow-sm"} onClick={onClickAction}>
                    <HiPencil/>
                </div>
            </div>
        </div>
    );
};

export default TimeslotCard;