import Sidebar from "../components/private/sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import {ModalProvider} from "../contexts/modal/ModalContext.tsx";
import {DialogProvider} from "../contexts/dialog/DialogContext.tsx";
import UserButton from "../components/private/UserButton.tsx";


const PrivateLayout = () => {
    return (
        <>
            <DialogProvider>
                <ModalProvider>
                    <Sidebar/>
                    <UserButton/>
                    <main className={"min-w-[calc(100vw-15rem)] h-[100vh] ml-60 pr-32 p-16 overflow-x-hidden"}>
                        <Outlet/>
                    </main>
                </ModalProvider>
            </DialogProvider>
        </>
    );
};

export default PrivateLayout;