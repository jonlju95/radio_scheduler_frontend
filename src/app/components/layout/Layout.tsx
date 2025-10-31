import Sidebar from "../sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Sidebar/>
            <main className={"min-w-[calc(100vw-15rem)] h-[100vh] ml-60 p-16 overflow-x-hidden"}>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;