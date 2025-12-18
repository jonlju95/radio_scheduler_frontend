import {type Option} from "../../../shared/components/DropdownField.tsx";
import type {CreateTimeslotFormType} from "../models/CreateTimeslotFormType.ts";
import {type DefaultValues} from "react-hook-form";
import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import CreateTimeslotFormFields from "./CreateTimeslotFormFields.tsx";

interface Props {
    hosts: Option[];
    shows: Option[];
    studios: Option[];
    onSubmit: (data: CreateTimeslotFormType) => void;
}

const defaultValues: DefaultValues<CreateTimeslotFormType> = {
    startTime: "",
    endTime: "",
    radioHostId: "",
    radioShowId: "",
    studioId: "",
    guests: []
};

const CreateTimeslotForm = ({hosts, shows, studios, onSubmit}: Props) => {
    return (
        <FormWrapper<CreateTimeslotFormType> defaultValues={defaultValues}
            onSubmit={onSubmit} submitButtonText={"Save timeslot"}>
            <CreateTimeslotFormFields
                hosts={hosts}
                shows={shows}
                studios={studios}/>
        </FormWrapper>
    );
};

export default CreateTimeslotForm;


