import InputField from "../../../shared/components/InputField.tsx";
import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import type {RadioShow} from "../models/RadioShow.ts";
import type {RadioShowFormType} from "../models/RadioShowFormType.ts";
import {mapRadioShowToForm} from "../mappers/radioShow.mapper.ts";
import {useMemo} from "react";

interface Props {
    radioShow: RadioShow;
    onSubmit: (data: RadioShowFormType) => void;
}

const RadioShowForm = ({radioShow, onSubmit}: Props) => {
    const defaultValues = useMemo(
        () => mapRadioShowToForm(radioShow),
        [radioShow]
    );

    return (
        <FormWrapper defaultValues={defaultValues}
                     onSubmit={onSubmit} submitButtonText={"Save radio show"}>
            <section className={"grid w-1/4 gap-x-4 h-full mb-4"}>
                <div className={"flex flex-col gap-y-6 h-full"}>
                    <InputField name={"title"} label={"Title"} required/>
                    <InputField name={"durationMin"} label={"Duration (min)"} required/>
                </div>
            </section>
        </FormWrapper>
    );
};

export default RadioShowForm;