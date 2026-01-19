import type {User} from "../models/User.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {userInfoService} from "../services/userInfo.service.ts";

export const useUserInfoList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        userInfoService.getUsers()
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
    }, []);

    const navigateToUser = (user: User) => {
        navigate(`./${user.id}`, {state: {user}});
    }

    return { users, loading, navigateToUser };
}