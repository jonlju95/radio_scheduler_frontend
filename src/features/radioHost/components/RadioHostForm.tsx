import ToggleField from "../../../shared/components/ToggleField.tsx";
import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import InputField from "../../../shared/components/InputField.tsx";
import type {RadioHost} from "../models/RadioHost.ts";
import type {RadioHostFormType} from "../models/RadioHostFormType.ts";
import {useMemo} from "react";
import {mapRadioHostToForm} from "../mappers/radioHost.mapper.ts";

interface Props {
    radioHost: RadioHost;
    onSubmit: (data: RadioHostFormType) => void;
}

const RadioHostForm = ({radioHost, onSubmit}: Props) => {
    const defaultValues = useMemo(
        () => mapRadioHostToForm(radioHost),
        [radioHost],
    );

    return (
        <FormWrapper defaultValues={defaultValues}
                     onSubmit={onSubmit} submitButtonText={"Save radio host"}>
            <InputField name={"firstName"} label={"First name"}/>
            <InputField name={"lastName"} label={"Last name"}/>
            <ToggleField round={true} name={"isGuest"} label={"Is guest"}/>
        </FormWrapper>
    );
};

export default RadioHostForm;