import Sidebar from "../shared/components/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import {DialogProvider} from "../shared/contexts/DialogContext.tsx";
import UserButton from "../shared/components/UserButton.tsx";
import { ModalProvider } from "../shared/contexts/ModalContext.tsx";


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