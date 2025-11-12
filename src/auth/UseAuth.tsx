import {createContext, useContext} from "react";

export type AuthContextType = {
    currentUser: string | null;
    login: (username: string, role?: "user" | "admin") => void;
    logout: () => void;
    isAdmin: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};