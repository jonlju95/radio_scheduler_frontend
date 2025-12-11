import {useAuth} from "../../../contexts/auth/UseAuth.tsx";
import ContentHeader from "../../../components/private/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../components/private/contentBody/ContentBody.tsx";
import FormWrapper from "../../../components/shared/FormWrapper.tsx";
import InputField from "../../../components/shared/InputField.tsx";
import type {User} from "../../../models/auth/User.ts";
import Button from "../../../components/shared/button/Button.tsx";
import {apiClient} from "../../../api/apiClient.ts";
import {useDialog} from "../../../contexts/dialog/UseDialog.tsx";


const UserInfo = () => {
    const {user, setUser} = useAuth();

    const {triggerDialog} = useDialog();

    const updateUser = async (data: User) => {
        const updatedUser = {
            ...data
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

        apiClient.put<User>(`/users/${user?.id}`, updatedUser)
            .then(r => {
                setUser(r.data);
                triggerDialog({
                    title: "Success",
                    message: "User updated",
                    variant: "success"
                });
            });
    }

    const testApi = async () => {
        console.log("Testing user info...");
        apiClient.get<User>(`/users/admin`).then((r) => {
            console.log(r.data);
        })
    }

    return (
        <div className={"content"}>
            <ContentHeader title={user?.firstName + " " + user?.lastName}
                           detailPage={true}/>
            <ContentBody>
                <FormWrapper<User> defaultValues={user ?? undefined} onSubmit={updateUser}>
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
                            <InputField<User> name={"password"} label={"Password"} required/>
                        </div>
                </FormWrapper>
                <Button onClickAction={testApi} btnLabel={"TestAPI"}/>
            </ContentBody>
        </div>
    );
};

export default UserInfo;