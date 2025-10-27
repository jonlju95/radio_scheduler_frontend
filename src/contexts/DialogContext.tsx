import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';
import "./DialogContext.css";

type DialogOptions = {
    title: string;
    message: string;
    classes?: string;
};

type DialogContextType = {
    triggerDialog: (options: DialogOptions) => void;
    clearDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within DialogContext');
    }
    return context;
};

export const DialogProvider = ({children}: { children: ReactNode }) => {
    const [dialog, setDialog] = useState<DialogOptions | null>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>(null);

    const triggerDialog = (options: DialogOptions) => {
        clearTimeout(timeoutId);
        setDialog(options);
        const time = setTimeout(() => setDialog(null), 2500);
        setTimeoutId(time);
    };

    const clearDialog = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        setDialog(null);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutId);
    }, [timeoutId]);

    return (
        <DialogContext.Provider value={{triggerDialog, clearDialog}}>
            {children}

            {dialog && (
                <div className={`dialogContainer ${dialog.classes}`} onClick={clearDialog}>
                    <div onClick={(e) => e.stopPropagation()}>
                        {dialog.title && <h4>{dialog.title}</h4>}
                        {dialog.message && <p>{dialog.message}</p>}
                    </div>
                </div>
            )}
        </DialogContext.Provider>
    );
};
