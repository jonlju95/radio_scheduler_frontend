import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import type {CreateStudioFormType} from "../models/CreateStudioFormType.ts";
import InputField from "../../../shared/components/InputField.tsx";
import type {Studio} from "../models/Studio.ts";
import {useMemo} from "react";
import {mapStudioToForm} from "../mappers/studio.mapper.ts";

interface Props {
    studio: Studio;
    onSubmit: (data: CreateStudioFormType) => void;
}

const CreateStudioForm = ({studio, onSubmit}: Props) => {
    const defaultValues = useMemo(
        () => mapStudioToForm(studio),
        [studio],
    );

    return (
        <FormWrapper<CreateStudioFormType> defaultValues={defaultValues}
                                           onSubmit={onSubmit} submitButtonText={"Save studio"}>
            <InputField name={"name"} label={"Studio name"} required/>
            <InputField type={"number"} name={"bookingPrice"} label={"Booking price"} required/>
            <InputField type={"number"} name={"capacity"} label={"Capacity"} required/>
        </FormWrapper>
    );
};

export default CreateStudioForm;