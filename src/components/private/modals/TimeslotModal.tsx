import {useMemo} from 'react';
import DropdownField from "../../shared/DropdownField.tsx";
import FormWrapper from "../../shared/FormWrapper.tsx";
import type {Timeslot} from "../../../models/Timeslot.ts";
import {useModal} from "../../../contexts/modal/UseModal.tsx";
import InputField from "../../shared/InputField.tsx";
import type {TimeslotForm} from "../../../models/form/TimeslotForm.ts";
import {mapTimeslotToForm} from "../../../utils/formMappers/timeslotFormMapper.ts";
import {useTimeslotDropdownOptions} from "../../../utils/hooks/useTimeslotDropdownOptions.ts";

const TimeslotModal = ({timeslotEdit}: {
    timeslotEdit: Timeslot;
}) => {
    const {closeModal} = useModal();

    const defaultValues = useMemo(
        () => mapTimeslotToForm(timeslotEdit),
        [timeslotEdit],
    );

    const {hosts, shows, studios, loading} = useTimeslotDropdownOptions();

    const saveTimeslot = (data: TimeslotForm) => {
        console.log(data);
        closeModal(data);
    }

    return (
        <>
            <h3 className={"mb-6"}>Edit timeslot</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={"h-full"}>
                    <FormWrapper<TimeslotForm> onSubmit={saveTimeslot} defaultValues={defaultValues}
                                               submitButtonText={"Save changes"}>
                        <div>
                            <InputField type={"time"} name={"startTime"} label={"Start time"} required/>
                            <InputField type={"time"} name={"endTime"} label={"End time"} required/>
                            <DropdownField name={"radioHostId"} label={"Host"} options={hosts}/>
                            <DropdownField name={"radioShowId"} label={"Show"} options={shows}/>
                            <DropdownField name={"studioId"} label={"Studio"} options={studios}/>
                        </div>
                    </FormWrapper>
                </div>

            )}
        </>
    );
};

export default TimeslotModal;