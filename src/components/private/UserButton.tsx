import {HiSun, HiUser} from "react-icons/hi2";
import Tooltip from "../shared/Tooltip.tsx";
import {useTheme} from "../../contexts/theme/UseTheme.tsx";

const UserButton = ({username = "Admin Adminson"}: { username?: string }) => {
    const {toggleTheme} = useTheme();

    return (
        <div className={"absolute w-full h-16 flex justify-end items-center pe-32 bg-surface-200-800"}>
            <Tooltip content={[]}>
                <div
                    className={"flex items-center cursor-pointer"}>
                    <p className={"me-3 text-xs"}>{username}</p>
                    <div className={"flex justify-center items-center h-8 w-8" +
                        " bg-surface-50-950 rounded-full shadow-sm"}>
                        <HiUser className={"w-4 text-primary-700-300"}/>
                    </div>
                </div>
            </Tooltip>
            <div onClick={() => toggleTheme()} className={"flex items-center cursor-pointer ms-4"}>
                <div className={"flex justify-center items-center h-8 w-8" +
                    " bg-surface-50-950 rounded-full shadow-sm"}>
                    <HiSun className={"w-4 text-primary-700-300"}/>
                </div>
            </div>
        </div>
    );
};

export default UserButton;