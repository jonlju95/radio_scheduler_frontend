import {useAuth} from "../../../../contexts/auth/UseAuth.tsx";
import ContentHeader from "../../../../components/private/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../../components/private/contentBody/ContentBody.tsx";
import FormWrapper from "../../../../components/shared/FormWrapper.tsx";
import InputField from "../../../../components/shared/InputField.tsx";
import type {User} from "../../../../models/auth/User.ts";
import {apiClient} from "../../../../api/apiClient.ts";
import {useDialog} from "../../../../contexts/dialog/UseDialog.tsx";
import {useLocation} from "react-router-dom";

const UserInfoDetail = () => {
    const {state} = useLocation();
    const isNew = state?.row?.id === "new";

    const {user, setUser} = useAuth();

    const {triggerDialog} = useDialog();

    const title = !isNew ? user?.firstName + " " + user?.lastName : "New user";

    const updateUser = async (data: User) => {
        const updatedUser = {
            ...data,
            id: !isNew ? user?.id : undefined
        }

        const hasChanged = Object.keys(updatedUser).some(
            key => (updatedUser as never)[key] !== (user as never)[key]
        );

        if (!hasChanged) {
            triggerDialog({
                title: "Warning",
                message: "No changes detected",
                variant: "warning"
            });
            return;
        }

        if (isNew) {
            apiClient.post<User>(`/users`, updatedUser)
                .then(() => {
                    triggerDialog({
                        title: "Success",
                        message: "User created",
                        variant: "success"
                    });
                });
        } else {
            apiClient.put<User>(`/users/${user?.id}`, updatedUser)
                .then(r => {
                    localStorage.setItem("authUser", JSON.stringify(r.data));
                    setUser(r.data);
                    triggerDialog({
                        title: "Success",
                        message: "User updated",
                        variant: "success"
                    });
                });
        }
    }

    return (
        <div className={"content"}>
            <ContentHeader title={title}
                           detailPage={true}/>
            <ContentBody>
                <FormWrapper<User> defaultValues={!isNew ? (user ?? undefined) : undefined} onSubmit={updateUser}>
                    <div className={"flex gap-4"}>
                        <InputField<User> name={"firstName"} label={"First name"} required/>
                        <InputField<User> name={"lastName"} label={"Last name"} required/>
                    </div>
                    <div className={"flex gap-4"}>
                        <InputField<User> name={"phone"} label={"Phone"}/>
                        <InputField<User> name={"email"} label={"Email"}/>
                    </div>
                    <div className={"flex gap-4"}>
                        <InputField<User> name={"address"} label={"Address"}/>
                        <InputField<User> name={"city"} label={"City"}/>
                        <InputField<User> name={"zipCode"} label={"Zip code"}/>
                    </div>
                    <div className={"flex gap-4"}>
                        <InputField<User> name={"username"} label={"Username"} required/>
                        <InputField<User> name={"password"} label={"Password"} type={"password"} required/>
                    </div>
                </FormWrapper>
            </ContentBody>
        </div>
    );
};

export default UserInfoDetail;