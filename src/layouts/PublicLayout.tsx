import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../shared/components/Navbar.tsx";
import {PlayerControlsProvider} from "../shared/contexts/PlayerControlsContext.tsx";

const PublicLayout = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === "/login";

    return (
        <>
            <PlayerControlsProvider>
                {!hideNavbar && <Navbar/>}
                <main id="scroll-container" className={"grid grid-cols-12 grid-rows-auto gap-4 gap-y-0 h-[100vh]" +
                    " overflow-x-hidden min-h-screen transition-colors transition-background duration-300"}>
                    <Outlet/>
                </main>
            </PlayerControlsProvider>
        </>

    );
};

export default PublicLayout;