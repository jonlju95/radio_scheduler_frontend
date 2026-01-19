import type {User} from "../../auth/models/User.ts";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../../shared/hooks/useAuth.ts";
import {useDialog} from "../../../shared/hooks/useDialog.ts";
import {useEffect, useState} from "react";
import {userInfoService} from "../services/userInfo.service.ts";
import type {UserFormType} from "../models/UserFormType.ts";

export const useUserInfoDetail = () => {
    const {state} = useLocation();
    const isNew = state?.user?.id === "new";
    const {triggerDialog} = useDialog();

    const emptyUser: User = {
        id: "new",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
        createdAt: new Date(),
        roles: []
    };

    const {user} = useAuth();

    const [userForm, setUserForm] = useState<User>(isNew ? emptyUser :
        (!state) ? user : state.user);

    const [loading, setLoading] = useState<boolean>(!isNew);

    useEffect(() => {
        if (isNew) {
            return;
        } else if (!state || (state && state?.user?.id === user?.id)) {
            setUserForm(user);
            setLoading(false);
            return;
        } else {
            userInfoService.getUser(user.id).then(user => {
                setUserForm(user);
                setLoading(false);
            })
        }
    }, [isNew, user?.id, state?.user?.id, user, state]);

    const saveUser = async (formData: UserFormType) => {
        await userInfoService.createUser(formData).then((createdUser) => {
            setUserForm(createdUser);
            triggerDialog({
                title: "Success",
                message: "Created user",
                variant: "success",
            })
        }).catch(error => {
            triggerDialog({
                title: "Error",
                message: error.message,
                variant: "error",
            });
        });
    }

    const updateUser = async (formData: UserFormType) => {
        await userInfoService.updateUser(userForm.id, formData).then((createdUser) => {
            setUserForm(createdUser);
            triggerDialog({
                title: "Success",
                message: "Updated user",
                variant: "success",
            })
        }).catch(error => {
            triggerDialog({
                title: "Error",
                message: error.message,
                variant: "error",
            });
        });
    }

    return {userForm, loading, isNew, saveUser, updateUser};
}