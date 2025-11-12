import {type ReactNode, useState} from 'react';
import {mockAuth} from "./mockSessions.ts";
import { AuthContext } from "./UseAuth.tsx";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    const login = (username: string, role: "user" | "admin" = "user") => {
        mockAuth.login(username, role);
        setCurrentUser(username)
    };

    const logout = () => {
        if (currentUser) {
            mockAuth.logout(currentUser);
        }
    };

    const isAdmin = () => currentUser ? mockAuth.isAdmin(currentUser) : false;

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};


