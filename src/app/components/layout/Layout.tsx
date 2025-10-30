import Sidebar from "../sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Sidebar/>
            <main className={"h-[100vh] min-w-[calc(100vw - 15rem)] ml-60 p-16 overflow-x-hidden"}>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;