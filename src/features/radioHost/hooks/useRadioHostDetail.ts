import {useLocation} from "react-router-dom";
import {useDialog} from "../../../shared/hooks/useDialog.ts";
import type {RadioHost} from "../models/RadioHost.ts";
import {useEffect, useState} from "react";
import {radioHostService} from "../services/radioHost.service.ts";
import type {RadioHostFormType} from "../models/RadioHostFormType.ts";

export const useRadioHostDetail = () => {
    const {state} = useLocation();
    const isNew = state.radioHost.id === "new";
    const {triggerDialog} = useDialog();

    const emptyHost: RadioHost = {
        id: "new",
        firstName: "",
        lastName: "",
        isGuest: false,
    };

    const [host, setHost] = useState<RadioHost>(isNew ? emptyHost : state.radioHost);
    const [loading, setLoading] = useState<boolean>(!isNew);

    useEffect(() => {
        if (isNew) {
            return;
        }

        radioHostService.getRadioHost(state.radioHost.id)
            .then(data => {
                setHost(data);
                setLoading(false);
            })
    }, [isNew, state.radioHost.id]);

    const saveHost = async (formData: RadioHostFormType) => {
        await radioHostService.createRadioHost(formData).then((createdRadioHost) => {
            setHost(createdRadioHost);
            triggerDialog({
                title: "Success",
                message: "Created host",
                variant: "success",
            })
        }).catch(error => {
            triggerDialog({
                title: "Error",
                message: error.message,
                variant: "error",
            });
        });
    }

    const updateHost = async (formData: RadioHostFormType) => {
        await radioHostService.updateRadioHost(host.id, formData).then((updatedRadioHost) => {
            setHost(updatedRadioHost);
            triggerDialog({
                title: "Success",
                message: "Updated host",
                variant: "success",
            })
        }).catch(error => {
            triggerDialog({
                title: "Error",
                message: error.message,
                variant: "error",
            })
        })
    }

    return { host, loading, isNew, saveHost, updateHost };
}