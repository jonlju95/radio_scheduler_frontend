import {createContext, useContext} from "react";

type dialogVariant = "success" | "warning" | "error" | undefined | null;

export type DialogOptions = {
    title: string;
    message: string;
    variant?: dialogVariant;
};

export type DialogContextType = {
    triggerDialog: (options: DialogOptions) => void;
    clearDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within DialogContext');
    }
    return context;
};