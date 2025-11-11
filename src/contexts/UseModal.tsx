import {createContext, type ReactNode, useContext} from "react";

type ModalContextType = {
    openModal: <T extends object>(content: ReactNode) => Promise<T>;
    closeModal: <T extends object>(result?: T) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};