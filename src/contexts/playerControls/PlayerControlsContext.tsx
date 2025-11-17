import {type ReactNode, useState} from 'react';
import {PlayerControlsContext} from "./UsePlayerControls";
import PlayerControls from "../../components/public/PlayerControls.tsx";

export const PlayerControlsProvider = ({children}: { children: ReactNode; }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [currentShow, setCurrentShow] = useState<string>("Music");

    const showControls = (currentShow: string) => {
        setVisible(true);
        setCurrentShow(currentShow);
        return visible;
    }

    const hideControls = () => {
        setVisible(false);
        setCurrentShow("");
        return visible;
    }

    return (
        <PlayerControlsContext.Provider value={{ showControls, hideControls }}>
            {children}
            {visible && <PlayerControls currentShow={currentShow || "Music"}/>}
        </PlayerControlsContext.Provider>
    );
};
