import {useEffect, useState} from 'react';
import type {RadioShow} from "../../../models/RadioShow.ts";
import type {RadioHost} from "../../../models/RadioHost.ts";
import type {Studio} from "../../../models/Studio.ts";
import {apiClient} from "../../../api/apiClient.ts";
import DropdownField, {type Option} from "../../shared/DropdownField.tsx";
import FormWrapper from "../../shared/FormWrapper.tsx";
import type {Timeslot} from "../../../models/Timeslot.ts";
import {useModal} from "../../../contexts/modal/UseModal.tsx";

const TimeslotModal = ({timeslotId}: {
    timeslotId: string;
}) => {
    const { closeModal } = useModal();

    const [shows, setRadioShows] = useState<Option[]>([{value: "", label: "Choose show"}]);
    const [hosts, setRadioHosts] = useState<Option[]>([{value: "", label: "Choose host"}]);
    const [studios, setStudios] = useState<Option[]>([{value: "", label: "Choose studio"}]);

    useEffect(() => {
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
    }, []);

    const saveTimeslot = (data: Timeslot) => {
        // console.log(data, timeslotId);
        closeModal(data);
    }

    return (
        (shows.length === 0 || hosts.length === 0 || studios.length === 0) ? (<div>Loading...</div>) : (
            <FormWrapper onSubmit={saveTimeslot}>
                <div className={"w-1/4"}>
                    <DropdownField name={"radioHost"} label={"Host"} options={hosts} />
                    <DropdownField name={"radioShow"} label={"Show"} options={shows}/>
                    <DropdownField name={"studio"} label={"Studio"} options={studios}/>
                </div>
            </FormWrapper>
        )
    );
};

export default TimeslotModal;