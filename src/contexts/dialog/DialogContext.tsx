import {type ReactNode, useEffect, useState} from 'react';
import {DialogContext, type DialogOptions} from "./UseDialog.tsx";
import {cn} from "../../utils/cn.ts";
import {dialogVariants} from "./dialog.styles.ts";

export const DialogProvider = ({children}: {children: ReactNode}) => {
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
                <div className={cn(dialogVariants({ status: dialog?.variant }))} onClick={clearDialog}>
                    <div onClick={(e) => e.stopPropagation()}>
                        {dialog.title && <h4>{dialog.title}</h4>}
                        {dialog.message && <p>{dialog.message}</p>}
                    </div>
                </div>
            )}
        </DialogContext.Provider>
    );
};
