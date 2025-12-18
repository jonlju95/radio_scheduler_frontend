import {type Option} from "../../../shared/components/DropdownField.tsx";
import {useEffect, useState} from "react";
import {apiClient} from "../../../api/apiClient.ts";
import type {RadioHost} from "../../radioHost/models/RadioHost.ts";
import type {RadioShow} from "../../radioShow/models/RadioShow.ts";
import type {Studio} from "../../studio/models/Studio.ts";

export const useTimeslotDropdownOptions = () => {
    const [hosts, setRadioHosts] = useState<Option[]>([{value: "", label: "Choose host"}]);
    const [shows, setRadioShows] = useState<Option[]>([{value: "", label: "Choose show"}]);
    const [studios, setStudios] = useState<Option[]>([{value: "", label: "Choose studio"}]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        Promise.all([
            apiClient.get<RadioHost[]>(`/radioHosts`),
            apiClient.get<RadioShow[]>("/radioShows"),
            apiClient.get<Studio[]>("/studios")])
            .then(([hostRes, showRes, studioRes]) => {
                setRadioHosts([
                    {value: "", label: "Choose host"},
                    ...hostRes.data.map(h => ({
                        value: h.id,
                        label: `${h.firstName} ${h.lastName}`,
                    })),
                ]);

                setRadioShows([
                    {value: "", label: "Choose show"},
                    ...showRes.data.map(s => ({
                        value: s.id,
                        label: s.title
                    }))
                ]);

                setStudios([
                    {value: "", label: "Choose studio"},
                    ...studioRes.data.map(s => ({
                        value: s.id,
                        label: s.name
                    }))
                ]);

                setLoading(false);
            });
    }, []);

    return {hosts, shows, studios, loading};
}