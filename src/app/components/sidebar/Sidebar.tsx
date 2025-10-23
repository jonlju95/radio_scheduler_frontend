import "./Sidebar.css";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <aside>
                <div>
                    <h1 className={"sidebarHeader"}>RadioFM</h1>
                </div>
                <ul>
                    <li>
                        <NavLink to={"/"} className={({isActive}) => (isActive ? 'active' : '')}>Overview</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/schedules"}
                                 className={({isActive}) => (isActive ? 'active' : '')}>Schedules</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/tableau"}
                                 className={({isActive}) => (isActive ? 'active' : '')}>Tableau</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/timeslots"}
                                 className={({isActive}) => (isActive ? 'active' : '')}>Timeslot</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/shows"} className={({isActive}) => (isActive ? 'active' : '')}>Shows</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/hosts"} className={({isActive}) => (isActive ? 'active' : '')}>Hosts</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/studios"}
                                 className={({isActive}) => (isActive ? 'active' : '')}>Studios</NavLink>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;