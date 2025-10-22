import Sidebar from "../sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Sidebar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;