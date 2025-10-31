import {type ReactNode, useState} from "react";
import {ModalContext} from "./UseModal";
import {HiXMark} from "react-icons/hi2";


export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode | null>(null);

    const openModal = (modalContent: ReactNode) => setContent(modalContent);
    const closeModal = () => setContent(null);

    return (
        <ModalContext.Provider value={{openModal, closeModal}}>
            {children}
            {content && (
                <div className="fixed inset-0 flex items-center justify-center bg-surface-900/50">
                    <div className="min-w-3/4 min-h-3/4 bg-surface-100-900 p-4 rounded shadow-lg relative">
                        {content}
                        <div
                            className={"absolute top-2 right-2 text-surface-900-100"}
                            onClick={closeModal}>
                            <HiXMark className={"h-8 w-8 cursor-pointer hover:text-surface-800-200"}/>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

