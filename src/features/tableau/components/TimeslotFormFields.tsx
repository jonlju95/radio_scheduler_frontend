import InputField from "../../../shared/components/InputField.tsx";
import DropdownField, {type Option} from "../../../shared/components/DropdownField.tsx";
import type {TimeslotFormType} from "../models/TimeslotFormType.ts";
import {useFieldArray, useFormContext} from "react-hook-form";
import Button from "../../../shared/components/Button.tsx";

interface Props {
    hosts: Option[];
    shows: Option[];
    studios: Option[];
    guests?: Option[];
}

const TimeslotFormFields = ({hosts, shows, studios, guests}: Props) => {
    const {control} = useFormContext<TimeslotFormType>();

    const {fields, append, remove} = useFieldArray({
        control,
        name: "guests"
    });

    return (
        <div className={"mb-4"}>
            <InputField type={"time"} name={"startTime"} label={"Start time"} required/>
            <InputField type={"time"} name={"endTime"} label={"End time"} required/>
            <DropdownField name={"radioShowId"} label={"Show"} options={shows}/>
            <DropdownField name={"studioId"} label={"Studio"} options={studios}/>
            <DropdownField name={"radioHostId"} label={"Host"} options={hosts}/>
            {fields.map((field, i) => (
                <>
                    <DropdownField key={field.id} name={`guests.${i}.radioHostId`} label={`Guest`}
                                   options={guests ?? hosts}/>
                    <Button btnLabel={"Remove guest"}
                            onClickAction={() => remove(i)}
                            intent={"secondary"}/>
                </>
            ))}
            {fields.length < 1 &&
                <Button btnLabel={"Add guest"}
                        onClickAction={() => append({radioHostId: ""})}
                        intent={"secondary"}
                />}
        </div>
    );
};

export default TimeslotFormFields;