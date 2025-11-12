import {type ReactNode, useEffect, useState} from 'react';
import {ThemeContext} from "./UseTheme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [darkTheme, setDarkTheme] = useState(false);

    const toggleTheme = () => {
        setDarkTheme((theme) => !theme);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-mode", darkTheme ? "dark" : "light");
    }, [darkTheme]);

    return (
        <ThemeContext.Provider value={{ toggleTheme, darkTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};
