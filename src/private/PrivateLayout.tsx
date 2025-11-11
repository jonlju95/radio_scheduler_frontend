import Sidebar from "../components/sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import {ModalProvider} from "../contexts/ModalContext.tsx";
import {DialogProvider} from "../contexts/DialogContext.tsx";


const PrivateLayout = () => {
    return (
        <>
            <DialogProvider>
                <ModalProvider>
                    <Sidebar/>
                    <main className={"min-w-[calc(100vw-15rem)] h-[100vh] ml-60 pr-32 p-16 overflow-x-hidden"}>
                        <Outlet/>
                    </main>
                </ModalProvider>
            </DialogProvider>
        </>
    );
};

export default PrivateLayout;