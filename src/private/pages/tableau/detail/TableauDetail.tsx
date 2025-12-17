import {useLocation} from "react-router-dom";
import type {Tableau} from "../../../../models/Tableau.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";
import ContentHeader from "../../../../components/private/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../../components/private/contentBody/ContentBody.tsx";
import type {Timeslot} from "../../../../models/Timeslot.ts";
import FormWrapper from "../../../../components/shared/FormWrapper.tsx";
import DropdownField, {type Option} from "../../../../components/shared/DropdownField.tsx";
import type {RadioHost} from "../../../../models/RadioHost.ts";
import type {RadioShow} from "../../../../models/RadioShow.ts";
import type {Studio} from "../../../../models/Studio.ts";
import InputField from "../../../../components/shared/InputField.tsx";
import TimeslotModal from "../../../../components/private/modals/TimeslotModal.tsx";
import {useModal} from "../../../../contexts/modal/UseModal.tsx";
import TimeslotCard from "../../../../components/private/timeslotCard/TimeslotCard.tsx";

export interface CreateTimeslotForm {
    startTime: string;       // "HH:mm"
    endTime: string;         // "HH:mm"

    radioHost?: string[];      // or string[]
    radioShowId?: string;
    studioId?: string;
}

const TableauDetail = () => {
    const {state} = useLocation();
    const isNew = state.row.id === "new";

    const emptyTableau: Tableau = {
        id: "new",
        date: state.row.date,
        timeslots: []
    };

    const [tableau, setTableau] = useState<Tableau>(isNew ? emptyTableau : state.row);
    const [loading, setLoading] = useState(!isNew);

    // const {triggerDialog} = useDialog();
    const {openModal} = useModal();

    const [shows, setRadioShows] = useState<Option[]>([{value: "", label: "Choose show"}]);
    const [hosts, setRadioHosts] = useState<Option[]>([{value: "", label: "Choose host"}]);
    const [studios, setStudios] = useState<Option[]>([{value: "", label: "Choose studio"}]);

    useEffect(() => {
        if (!isNew) {
            apiClient.get<Tableau>(`/tableaux/${tableau.id}`)
                .then(response => {
                    setTableau(response.data);
                    setLoading(false);
                });
        }

        Promise.all([
            apiClient.get<RadioHost[]>(`/radioHosts`)
                .then((response) => {
                    return response.data.map((host) => {
                        return {value: host.id, label: host.firstName + " " + host.lastName};
                    });
                }),
            apiClient.get<RadioShow[]>("/radioShows")
                .then((response) => {
                    return response.data.map((show) => {
                        return {value: show.id, label: show.title};
                    });
                }),
            apiClient.get<Studio[]>("/studios").then(response => {
                return response.data.map((studio) => {
                    return {value: studio.id, label: studio.name};
                });
            })
        ]).then(([hostList, showList, studioList]) => {
            setRadioHosts((prev) => [...prev, ...hostList]);
            setRadioShows((prev) => [...prev, ...showList]);
            setStudios((prev) => [...prev, ...studioList]);
        });
    }, [isNew, tableau.id]);

    const editTimeslot = (timeslot: Timeslot) => {
        openModal<Timeslot>(<TimeslotModal timeslotEdit={timeslot}/>).then((data) => {
            console.log(data);
            // const timeslot: Timeslot = {
            //     ...data
            // };
            // tableau.timeslots.push(timeslot);
            // console.log(tableau);
        });
    }

    const saveTimeslot = (timeslot: Timeslot) => {
        const [startHour, startMinute] = timeslot.startTime.split(":").map(Number);
        const [endHour, endMinute] = timeslot.endTime.split(":").map(Number);

        const startDateTime = new Date(tableau.date);
        startDateTime.setHours(startHour, startMinute, 0, 0);

        const endDateTime = new Date(tableau.date);
        endDateTime.setHours(endHour, endMinute, 0, 0);

        timeslot.startTime = startDateTime.toISOString();
        timeslot.endTime = endDateTime.toISOString();

        const newTimeslot = {
            ...timeslot,
            tableauId: tableau.id
        }

        apiClient.post<Timeslot>(`/timeslots`, newTimeslot).then((r) => {
            console.log(r);
            tableau.timeslots.push(r.data);
        })
    }

    const parseTime = (dateTime: string) => {
        const date = new Date(dateTime);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return hours + ':' + minutes;
    }

    return (
        <div className={"content"}>
            <ContentHeader
                title={!isNew ? String(tableau?.date) : String(tableau?.date.getFullYear() + "-" + (tableau?.date.getMonth() + 1) + "-" + ('0' + tableau?.date.getDate()).slice(-2))}
                detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <div className={"flex w-full h-full justify-between gap-x-4"}>
                        <div className={"min-w-1/3"}>
                            <FormWrapper<Timeslot> onSubmit={saveTimeslot} submitButtonText={"Save timeslot"}>
                                <div>
                                    <InputField type={"time"} name={"startTime"} label={"Start time"} required/>
                                    <InputField type={"time"} name={"endTime"} label={"End time"} required/>
                                    <DropdownField name={"radioHost"} label={"Host"} options={hosts}/>
                                    <DropdownField name={"radioShowId"} label={"Show"} options={shows}/>
                                    <DropdownField name={"studioId"} label={"Studio"} options={studios}/>
                                </div>
                            </FormWrapper>
                        </div>
                        <div className={"w-full p-4 pt-0 border-l border-surface-300-700"}>
                            {tableau?.timeslots.length === 0 ?
                                <p>No timeslots added</p>
                                : tableau?.timeslots?.map((t) => (
                                    <TimeslotCard
                                        key={t.id}
                                        startTime={parseTime(t.startTime)}
                                        showTitle={t.radioShow?.title} studioName={t.studio?.name} hosts={t.radioHosts}
                                        onClickAction={() => editTimeslot(t)}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            </ContentBody>
        </div>
    )
};

export default TableauDetail;