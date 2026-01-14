import {type Option} from "../../../shared/components/DropdownField.tsx";
import type {TimeslotFormType} from "../models/TimeslotFormType.ts";
import {type DefaultValues} from "react-hook-form";
import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import TimeslotFormFields from "./TimeslotFormFields.tsx";

interface Props {
    hosts: Option[];
    shows: Option[];
    studios: Option[];
    onSubmit: (data: TimeslotFormType) => void;
}

const defaultValues: DefaultValues<TimeslotFormType> = {
    startTime: "",
    endTime: "",
    radioHostId: "",
    radioShowId: "",
    studioId: "",
    guests: []
};

const TimeslotForm = ({hosts, shows, studios, onSubmit}: Props) => {
    return (
        <FormWrapper<TimeslotFormType> defaultValues={defaultValues}
                                       onSubmit={onSubmit} submitButtonText={"Save timeslot"}>
            <TimeslotFormFields
                hosts={hosts}
                shows={shows}
                studios={studios}/>
        </FormWrapper>
    );
};

export default TimeslotForm;


