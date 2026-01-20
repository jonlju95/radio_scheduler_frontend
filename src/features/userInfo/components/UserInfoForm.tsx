import {useMemo} from 'react';
import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import type {User} from "../models/User.ts";
import InputField from "../../../shared/components/InputField.tsx";
import type {UserFormType} from "../models/UserFormType.ts";
import {mapUserToForm} from "../mappers/userInfo.mapper.ts";
import PasswordField from "../../../shared/components/PasswordField.tsx";

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
            <section className={"grid grid-cols-[2fr_1fr] gap-x-4 h-full mb-4"}>
                <div className={"flex flex-col gap-y-6 h-full"}>
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
                        <PasswordField<User> name={"password"} label={"Password"}/>
                    </div>
                </div>
                <div className={"px-4 border-l h-full"}>
                </div>
            </section>
        </FormWrapper>
    );
};

export default UserInfoForm;