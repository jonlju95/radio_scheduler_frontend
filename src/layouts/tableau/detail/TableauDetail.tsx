import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import type {Timeslot} from "../../../features/tableau/models/Timeslot.ts";
import TimeslotModal from "../../../features/tableau/components/TimeslotModal.tsx";
import {useModal} from "../../../shared/hooks/useModal.ts";
import {useTimeslotDropdownOptions} from "../../../features/tableau/hooks/useTimeslotDropdownOptions.ts";
import TimeslotList from "../../../features/tableau/components/TimeslotList.tsx";
import {useTableau} from "../../../features/tableau/hooks/useTableau.ts";
import TimeslotForm from "../../../features/tableau/components/TimeslotForm.tsx";

const TableauDetail = () => {
    const {tableau, isNew, loading, addTimeslot, updateTimeslot} = useTableau();
    const {hosts, shows, studios} = useTimeslotDropdownOptions();
    const {openModal} = useModal();

    const editTimeslot = (timeslot: Timeslot) => {
        openModal<Timeslot>(
            <TimeslotModal timeslotEdit={timeslot} tableau={tableau}/>
        ).then(updated => {
            if (updated) {
                updateTimeslot(updated);
            }
        });
    }

    const parseDate = () => {
        return !isNew
            ? String(tableau?.date)
            : String(tableau?.date.getFullYear() + "-" + (tableau?.date.getMonth() + 1)
                + "-" + ('0' + tableau?.date.getDate()).slice(-2));
    }

    return (
        <div className={"content"}>
            <ContentHeader
                title={parseDate()}
                detailPage={true}/>
            <ContentBody>
                {loading ? <div>Loading...</div> : (
                    <div className={"flex w-full h-full justify-between gap-x-4"}>
                        <div className={"min-w-1/3"}>
                            <TimeslotForm
                                hosts={hosts} shows={shows} studios={studios}
                                onSubmit={addTimeslot}
                            />
                        </div>
                        <div className={"w-full p-4 pt-0 border-l border-surface-300-700"}>
                            <TimeslotList timeslots={tableau.timeslots} onEdit={editTimeslot}/>
                        </div>
                    </div>
                )}
            </ContentBody>
        </div>
    )
};

export default TableauDetail;