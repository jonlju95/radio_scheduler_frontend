import Sidebar from "../components/private/sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import {DialogProvider} from "../contexts/dialog/DialogContext.tsx";
import UserButton from "../components/private/UserButton.tsx";
import { ModalProvider } from "../contexts/modal/ModalContext.tsx";


const PrivateLayout = () => {
    return (
        <DialogProvider>
            <ModalProvider>
                <Sidebar/>
                <UserButton/>
                <main
                    className={"min-w-[calc(100vw-15rem)] h-[100vh] ml-60 pr-32 p-16 overflow-x-hidden min-h-screen transition-colors transition-background duration-300"}>
                    <Outlet/>
                </main>
            </ModalProvider>
        </DialogProvider>
    );
};

export default PrivateLayout;