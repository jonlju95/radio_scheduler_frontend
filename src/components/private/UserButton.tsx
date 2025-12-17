import {HiSun, HiUser} from "react-icons/hi2";
import Tooltip from "../shared/Tooltip.tsx";
import {useTheme} from "../../contexts/theme/UseTheme.tsx";
import {useAuth} from "../../contexts/auth/UseAuth.tsx";
import {useEffect, useState} from "react";

const UserButton = () => {
    const {toggleTheme} = useTheme();
    const {user} = useAuth();

    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        setDisplayName(`${user?.firstName} ${user?.lastName}`);
    }, [user]);

    const tooltipLinks: { href: string; label: string } = {href: ('/admin/users/' + (user?.id ?? "dashboard")), label: "Settings"}

    return (
        <div className={"absolute w-full h-16 flex justify-end items-center pe-32 bg-surface-200-800"}>
            <Tooltip content={[tooltipLinks]}>
                <div
                    className={"flex items-center cursor-pointer"}>
                    <p className={"me-3 text-xs"}>{displayName}</p>
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