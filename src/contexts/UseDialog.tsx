import {createContext, useContext} from "react";

export type DialogOptions = {
    title: string;
    message: string;
    classes?: string;
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