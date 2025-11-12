export const loggedInUsers: {username: string; password: string}[] = [];

export const getUsers = async () => {
    return loggedInUsers[0];
}