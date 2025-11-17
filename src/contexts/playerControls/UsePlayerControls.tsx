import {createContext, useContext} from 'react';

type PlayerControlsType = {
    showControls: (currentShow: string) => boolean;
    hideControls: () => boolean;
}

export const PlayerControlsContext = createContext<PlayerControlsType | undefined>(undefined);

export const usePlayerControls = () => {
    const context = useContext(PlayerControlsContext);
    if (!context) {
        throw new Error("usePlayerControls must be used within usePlayerControls");
    }
    return context;
};
