import {type ReactNode, useState} from 'react';
import type {User} from "../../features/auth/models/User.ts";
import {AuthContext} from "../hooks/useAuth.ts";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("authToken");
    });

    const [user, setUser] = useState((): User | null => {
        const storedUser = JSON.parse(localStorage.getItem("authUser") as string);
        return storedUser ?? null;
    });

    const login = (data: { user: User | null, token: string }) => {
        if (!data.user) return;

        const normalizedUser = {
            ...data.user,
            roles: data.user.roles.map((ur: any) => ur.role)
        };

        setUser(normalizedUser);
        setToken(data.token);

        localStorage.setItem("authUser", JSON.stringify(normalizedUser));
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

