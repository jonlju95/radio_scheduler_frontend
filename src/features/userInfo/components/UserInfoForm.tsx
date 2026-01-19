import {useMemo} from 'react';
import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import type {User} from "../models/User.ts";
import InputField from "../../../shared/components/InputField.tsx";
import type {UserFormType} from "../models/UserFormType.ts";
import {mapUserToForm} from "../mappers/userInfo.mapper.ts";

interface Props {
    user: User | null;
    onSubmit: (data: UserFormType) => void;
}

const UserInfoForm = ({user, onSubmit}: Props) => {
    const defaultValues = useMemo(
        () => mapUserToForm(user),
        [user]
    )

    return (
        <FormWrapper<User> defaultValues={defaultValues} onSubmit={onSubmit}
                           submitButtonText={"Save user"}>
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
    );
};

export default UserInfoForm;