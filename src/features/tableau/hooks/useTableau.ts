import {useLocation} from "react-router-dom";
import type {Tableau} from "../models/Tableau.ts";
import {useEffect, useState} from "react";
import type {Timeslot} from "../models/Timeslot.ts";
import {tableauService} from "../services/tableau.service.ts";
import {timeslotService} from "../services/timeslot.service.ts";
import {useDialog} from "../../../shared/hooks/useDialog.ts";
import type {CreateTimeslotFormType} from "../models/CreateTimeslotFormType.ts";

export const useTableau = () => {
    const { state } = useLocation();
    const isNew = state.row.id === "new";
    const {triggerDialog} = useDialog();

    const emptyTableau: Tableau = {
        id: "new",
        date: state.row.date,
        timeslots: []
    };

    const [tableau, setTableau] = useState<Tableau>(isNew ? emptyTableau : state.row);
    const [loading, setLoading] = useState(!isNew);

    useEffect(() => {
        if (isNew) {
            return;
        }

        tableauService.getTableau(state.row.id)
            .then(data => {
                setTableau(data);
                setLoading(false);
            });
    }, [isNew, state.row.id]);

    const addTimeslot = async (formData: CreateTimeslotFormType) => {
        await timeslotService.createTimeslot(formData, tableau).then((createdTimeslot) => {
            setTableau(prev => ({
                ...prev,
                timeslots: [...prev.timeslots, createdTimeslot]
            }));
            triggerDialog({
                title: "Success",
                message: "Created timeslot",
                variant: "success",
            })
        }).catch(error => {
            triggerDialog({
                title: "Error",
                message: error.message,
                variant: "error",
            })
        });


    };

    const updateTimeslot = (updated: Timeslot) => {
        setTableau(prev => ({
            ...prev,
            timeslots: prev.timeslots.map(t =>
                t.id === updated.id ? updated : t
            )
        }));
    };

    return { tableau, loading, isNew, addTimeslot, updateTimeslot };
}