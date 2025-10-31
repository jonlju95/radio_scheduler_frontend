import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import {HiCalendar, HiClock, HiCube, HiHome, HiMicrophone, HiUser} from "react-icons/hi2";

const Sidebar = () => {
    const links = [
        {target: "/", title: "Overview", icon: <HiHome className={"me-4 text-tertiary-500"}/>},
        {target: "/tableau", title: "Tableau", icon: <HiCalendar className={"me-4 text-tertiary-500"}/>},
        {target: "/timeslots", title: "Timeslot", icon: <HiClock className={"me-4 text-tertiary-500"}/>},
        {target: "/shows", title: "Shows", icon: <HiMicrophone className={"me-4 text-tertiary-500"}/>},
        {target: "/hosts", title: "Hosts", icon: <HiUser className={"me-4 text-tertiary-500"}/>},
        {target: "/studios", title: "Studios", icon: <HiCube className={"me-4 text-tertiary-500"}/>},
    ]

    return (
        <>
            <aside className={"h-[100vh] w-60 fixed left-0 top-0 flex flex-col py-6 px-4 bg-surface-100" +
                " border-r-1 border-solid border-r-surface-200"}>
                <div>
                    <h1 className={"h3 text-primary-500 text-center mb-16"}>RadioFM</h1>
                </div>
                <ul className={"list-unstyled"}>
                    {links.map((link, index) => (
                            <Fragment key={index}>
                                {index === 3 && (
                                    <li className={"mb-4"}>
                                        <h5>Admin</h5>
                                    </li>
                                )}
                                <li className={"mb-4"}>
                                    <NavLink to={link.target}
                                             className={`flex items-center p-4 h-full w-full rounded-xl [&.active]:bg-surface-200 hover:bg-surface-200`}>{link.icon}{link.title}</NavLink>
                                </li>
                            </Fragment>
                        )
                    )}
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;