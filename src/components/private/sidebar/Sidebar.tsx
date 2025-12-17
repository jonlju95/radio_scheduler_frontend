import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import {HiCalendar, HiCube, HiHome, HiMicrophone, HiUser} from "react-icons/hi2";

const Sidebar = () => {
    const links = [
        {target: "dashboard", title: "Overview", icon: <HiHome className={"me-4 text-tertiary-700-300"}/>},
        {target: "tableau", title: "Tableau", icon: <HiCalendar className={"me-4 text-tertiary-700-300"}/>},
        {target: "shows", title: "Shows", icon: <HiMicrophone className={"me-4 text-tertiary-700-300"}/>},
        {target: "hosts", title: "Hosts", icon: <HiUser className={"me-4 text-tertiary-700-300"}/>},
        {target: "studios", title: "Studios", icon: <HiCube className={"me-4 text-tertiary-700-300"}/>},
        // {target: "timeslots", title: "Timeslot", icon: <HiClock className={"me-4 text-tertiary-700-300"}/>},
        {target: "users", title: "Users", icon: <HiUser className={"me-4 text-tertiary-700-300"}/>},
    ]

    return (
        <aside className={"h-[100vh] w-60 fixed left-0 top-0 flex flex-col py-6 px-4 bg-surface-200-800" +
            " text-surface-950-50 z-9999"}>
            <div>
                <h1 className={"h3 text-primary-700-300 text-center mb-16"}>RadioFM</h1>
            </div>
            <ul>
                {links.map((link, index) => (
                        <Fragment key={index}>
                            {index === 2 && (
                                <li className={"mb-4 mt-12"}>
                                    <h5>Radio objects</h5>
                                </li>
                            )}
                            {index === links.length-1 && (
                                <li className={"mb-4 mt-12"}>
                                    <h5>Admin</h5>
                                </li>
                            )}
                            <li className={"mb-4"}>
                                <NavLink to={link.target}
                                         className={`flex items-center p-4 h-full w-full rounded-xl [&.active]:bg-primary-200-800 hover:bg-primary-200-800`}>
                                    {link.icon}{link.title}</NavLink>
                            </li>
                        </Fragment>
                    )
                )}
            </ul>
        </aside>
    )
}

export default Sidebar;