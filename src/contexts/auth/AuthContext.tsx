import {type ReactNode, useState} from 'react';
import type {User} from "../../models/auth/User.ts";
import {AuthContext} from "./UseAuth.tsx";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("authToken");
    });

    const [user, setUser] = useState((): User | null => {
        const storedUser = JSON.parse(localStorage.getItem("authUser") as string);
        return storedUser ?? null;
    });

    const login = (data: { user: User | null, token: string }) => {
        setUser(user);
        setToken(token);

        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
    }

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

