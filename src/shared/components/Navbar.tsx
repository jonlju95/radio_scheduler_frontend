import {NavLink, useNavigate} from "react-router-dom";
import {HiSun, HiUser} from "react-icons/hi2";
import {useTheme} from "../hooks/useTheme.ts";
import {cn} from "../utils/mappers/cn.ts";
import {usePlayerControls} from "../hooks/usePlayerControls.ts";

const navLinkClasses = ["text-xs", "text-center", "px-3", "py-1", "me-8", "[&.active]:text-primary-800-200", "[&.active]:font-bold",
    "[&.active]:bg-surface-200-800", "hover:text-primary-800-200", "hover:font-bold", "hover:bg-surface-200-800", "inline-block", "min-w-24", "rounded-md"]

const Navbar = () => {
    const navigate = useNavigate();
    const {toggleTheme} = useTheme();
    const {hideControls} = usePlayerControls();

    return (
        <nav className={"fixed inset-0 w-full h-20 bg-surface-100-900 px-32 py-3 flex justify-between items-center" +
            " border-b border-surface-200-800 shadow-md z-9999"}>
            <h6 className={"min-w-[11rem]"}>RadioFM</h6>
            <div className={"w-full flex justify-center"}>
                <NavLink className={cn(navLinkClasses)} to={""}>Home</NavLink>
                <p className={cn(navLinkClasses, "hover:font-normal hover:bg-transparent")} >About Us</p>
                <p className={cn(navLinkClasses, "hover:font-normal hover:bg-transparent")} >Podcasts</p>
                <p className={cn(navLinkClasses, "hover:font-normal hover:bg-transparent")} >News</p>
                <NavLink className={cn(navLinkClasses, "me-0")} to={"tableau"}>Tableau</NavLink>
            </div>
            <div className={"flex items-center justify-between min-w-[11rem]"}>
                <div onClick={() => {
                    hideControls();
                    navigate("/login");
                }} className={"flex items-center cursor-pointer me-4"}>
                    <p className={"me-3 text-xs"}>Admin login</p>
                    <div className={"flex justify-center items-center h-8 w-8" +
                        " bg-surface-50-950 rounded-full shadow-sm"}>
                        <HiUser className={"w-4 text-primary-700-300"}/>
                    </div>
                </div>
                <div onClick={() => toggleTheme()} className={"flex items-center cursor-pointer"}>
                    <div className={"flex justify-center items-center h-8 w-8" +
                        " bg-surface-50-950 rounded-full shadow-sm"}>
                        <HiSun className={"w-4 text-primary-700-300"}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;