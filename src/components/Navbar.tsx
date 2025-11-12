import {NavLink, useNavigate} from "react-router-dom";
import {HiSun, HiUser} from "react-icons/hi2";
import {useTheme} from "../contexts/UseTheme.tsx";


const Navbar = () => {
    const navigate = useNavigate();
    const {toggleTheme} = useTheme();

    return (
        <nav className={"fixed inset-0 w-full h-20 bg-surface-100-900 px-32 py-3 flex justify-between items-center" +
            " border-b border-surface-200-800 shadow-md z-9999"}>
            <h6>RadioFM</h6>
            <div>
                <NavLink className={"text-xs p-3 me-12 [&.active]:text-primary-800-200 [&.active]:font-bold" +
                    " hover:text-primary-800-200 hover:font-bold"} to={""}>Home</NavLink>
                <NavLink className={"text-xs p-3 me-12 [&.active]:text-primary-800-200 [&.active]:font-bold" +
                    " hover:text-primary-800-200 hover:font-bold"} to={"about"}>About Us</NavLink>
                <NavLink className={"text-xs p-3 me-12 [&.active]:text-primary-800-200 [&.active]:font-bold" +
                    " hover:text-primary-800-200 hover:font-bold"} to={"podcasts"}>Podcasts</NavLink>
                <NavLink className={"text-xs p-3 me-12 [&.active]:text-primary-800-200 [&.active]:font-bold" +
                    " hover:text-primary-800-200 hover:font-bold"} to={"news"}>News</NavLink>
                <NavLink className={"text-xs p-3 [&.active]:text-primary-800-200 [&.active]:font-bold" +
                    " hover:text-primary-800-200 hover:font-bold"} to={"tableau"}>Tableau</NavLink>
            </div>

            <div className={"flex items-center justify-between"}>
                <div onClick={() => navigate("/login")} className={"flex items-center cursor-pointer me-4"}>
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