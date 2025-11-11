import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

const PublicLayout = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === "/login";

    return (
        <>
            {!hideNavbar && <Navbar/>}
            <main className={"grid grid-cols-12 grid-rows-auto gap-4 gap-y-0 h-[100vh] overflow-x-hidden"}>
                <Outlet/>
            </main>
        </>

    );
};

export default PublicLayout;