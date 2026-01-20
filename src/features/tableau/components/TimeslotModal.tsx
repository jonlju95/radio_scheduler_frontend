import {useMemo} from 'react';
import FormWrapper from "../../../shared/components/FormWrapper.tsx";
import type {Timeslot} from "../models/Timeslot.ts";
import {useModal} from "../../../shared/hooks/useModal.ts";
import type {TimeslotFormType} from "../models/TimeslotFormType.ts";
import {mapTimeslotToForm} from "../mappers/timeslot.mapper.ts";
import {useTimeslotDropdownOptions} from "../hooks/useTimeslotDropdownOptions.ts";
import {timeslotService} from "../services/timeslot.service.ts";
import {useDialog} from "../../../shared/hooks/useDialog.ts";
import TimeslotFormFields from "./TimeslotFormFields.tsx";
import type {Tableau} from "../models/Tableau.ts";

const TimeslotModal = ({timeslotEdit, tableau}: {
    timeslotEdit: Timeslot;
    tableau: Tableau;
}) => {
    const {closeModal} = useModal();
    const {triggerDialog} = useDialog();

    const defaultValues = useMemo(
        () => mapTimeslotToForm(timeslotEdit),
        [timeslotEdit],
    );

    const {hosts, shows, studios, loading} = useTimeslotDropdownOptions();

    const updateTimeslot = async (formData: TimeslotFormType) => {
        await timeslotService.updateTimeslot(timeslotEdit.id, formData, tableau).then(updatedTimeslot => {
            triggerDialog({
                title: "Success",
                message: "Timeslot updated successfully",
                variant: "success",
            })
            closeModal(updatedTimeslot);
        }).catch(error => {
            triggerDialog({
                title: "Error",
                message: error.message,
                variant: "error",
            })
        });
    }

    return (
        <>
            <h3 className={"mb-6"}>Edit timeslot</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={"h-full"}>
                    <FormWrapper<TimeslotFormType> onSubmit={updateTimeslot} defaultValues={defaultValues}
                                                   submitButtonText={"Save changes"}>
                        <TimeslotFormFields
                            hosts={hosts}
                            shows={shows}
                            studios={studios}
                            guests={hosts.filter(h => h.value !== timeslotEdit?.radioHosts?.[0]?.id)}/>
                    </FormWrapper>
                </div>

            )}
        </>
    );
};

export default TimeslotModal;