import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import type {StudioFormType} from "../models/StudioFormType.ts";
import InputField from "../../../shared/components/InputField.tsx";
import type {Studio} from "../models/Studio.ts";
import {useMemo} from "react";
import {mapStudioToForm} from "../mappers/studio.mapper.ts";

interface Props {
    studio: Studio;
    onSubmit: (data: StudioFormType) => void;
}

const StudioForm = ({studio, onSubmit}: Props) => {
    const defaultValues = useMemo(
        () => mapStudioToForm(studio),
        [studio],
    );

    return (
        <FormWrapper<StudioFormType> defaultValues={defaultValues}
                                     onSubmit={onSubmit} submitButtonText={"Save studio"}>
            <InputField name={"name"} label={"Studio name"} required/>
            <InputField type={"number"} name={"bookingPrice"} label={"Booking price"} required/>
            <InputField type={"number"} name={"capacity"} label={"Capacity"} required/>
        </FormWrapper>
    );
};

export default StudioForm;