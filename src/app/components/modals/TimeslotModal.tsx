import React, {useEffect, useState} from 'react';
import type {RadioShow} from "../../../models/RadioShow.ts";
import type {RadioHost} from "../../../models/RadioHost.ts";
import type {Studio} from "../../../models/Studio.ts";
import {apiClient} from "../../../api/apiClient.ts";
import DropdownField, {type Option} from "../DropdownField.tsx";
import Button from "../button/Button.tsx";

const TimeslotModal = ({timeslotId}: {
    timeslotId: string;
}) => {
    const [shows, setRadioShows] = useState<Option[]>([{value: "", label: "Choose show"}]);
    const [hosts, setRadioHosts] = useState<Option[]>([{value: "", label: "Choose host"}]);
    const [studios, setStudios] = useState<Option[]>([{value: "", label: "Choose studio"}]);

    useEffect(() => {
        Promise.all([
            apiClient.get<Studio[]>("/studios").then(response => {
                return response.data.map((studio) => {
                    return {value: studio.id, label: studio.name};
                });
            }),
            apiClient.get<RadioShow[]>("/radioShows")
                .then((response) => {
                    return response.data.map((show) => {
                        return {value: show.id, label: show.title};
                    });
                }),
            apiClient.get<RadioHost[]>(`/radioHosts`)
                .then((response) => {
                    return response.data.map((host) => {
                        return {value: host.id, label: host.firstName + " " + host.lastName};
                    });
                })
        ])
            .then(([studioList, showList, hostList]) => {
                setStudios((prev) => [...prev, ...studioList]);
                setRadioShows((prev) => [...prev, ...showList]);
                setRadioHosts((prev) => [...prev, ...hostList]);
            });
    }, []);

    const saveTimeslot = (formData: FormData) => {
        console.log(formData);
    }

    return (
        (shows.length === 0 || hosts.length === 0 || studios.length === 0) ? (<div>Loading...</div>) : (
            <form onSubmit={e => {
                e.preventDefault();
                saveTimeslot(new FormData(e.currentTarget));
            }}>
                <div className={"w-1/4"}>
                    <div><span>Start time</span></div>
                    <div><span>End time</span></div>
                    <DropdownField dropdownName={"radioHost"} dropdownLabel={"Host"} options={hosts}/>
                    <DropdownField dropdownName={"radioShow"} dropdownLabel={"Show"} options={shows}/>
                    <DropdownField dropdownName={"studio"} dropdownLabel={"Studio"} options={studios}/>
                </div>
                <Button btnLabel={"Submit"} btnType="submit" btnClasses={["btn-primary"]}/>
            </form>
        )
    );
};

export default TimeslotModal;