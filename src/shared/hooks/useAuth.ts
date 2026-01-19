import type {User} from "../../features/auth/models/User.ts";
import {createContext, useContext} from "react";

export interface AuthState {
    user: User;
    token: string | null;
}

export interface AuthContextValue extends AuthState {
    login: (data: { user: User, token: string }) => void;
    logout: () => void;
    setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error();
    }
    return context;
}