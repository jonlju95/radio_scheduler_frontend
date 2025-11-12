interface Session {
    username: string;
    role: "admin" | "user";
}

const sessions: Session[] = [];

export const mockAuth = {
    login: (username: string, role: "admin" | "user" = "user") => {
        if(!sessions.find((s) => s.username === username)) {
            sessions.push({ username, role });
        }
    },
    logout: (username: string) => {
        const index = sessions.findIndex(session => session.username === username);
        if(index > -1) {
            sessions.splice(index, 1);
        }
    },
    isLoggedIn: (username: string) => {
        return sessions.some((s) => s.username === username);
    },
    isAdmin: (username: string) => {
        return sessions.some((s) => s.username === username && s.role === "admin");
    },
    getSessions: () => [...sessions],
    getCurrentUser() {
        return sessions.at(-1) ?? null;
    },
}