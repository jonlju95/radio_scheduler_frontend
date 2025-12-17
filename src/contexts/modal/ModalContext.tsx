import {type ReactNode, useRef, useState} from "react";
import {ModalContext} from "./UseModal.tsx";
import {HiXMark} from "react-icons/hi2";

export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode | null>(null);
    const resolver = useRef<((value: unknown) => void) | null>(null);

    const openModal = <T,>(modalContent: ReactNode): Promise<T> => {
        setContent(modalContent);
        return new Promise((resolve) => {
            resolver.current = resolve as (value: unknown) => void;
        })
    }

    const closeModal = <T,>(result?: T | undefined) => {
        setContent(null);
        if (resolver.current) {
            resolver.current?.(result);
            resolver.current = null;
        }
    }

    return (
        <ModalContext.Provider value={{openModal, closeModal}}>
            {children}
            {content && (
                <div className="fixed inset-0 flex items-center justify-center bg-surface-900/50">
                    <div className="grid grid-rows-[5rem] min-w-1/2 min-h-3/4 bg-surface-100-900 p-8 rounded shadow-lg relative">
                        {content}
                        <div
                            className={"absolute top-2 right-2 text-surface-900-100"}
                            onClick={() => closeModal()}>
                            <HiXMark className={"h-8 w-8 cursor-pointer hover:text-surface-800-200"}/>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

