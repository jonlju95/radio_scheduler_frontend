import {useLocation} from "react-router-dom";
import type {RadioShow} from "../models/RadioShow.ts";
import {useEffect, useState} from "react";
import {radioShowService} from "../services/radioShow.service.ts";
import type {RadioShowFormType} from "../models/RadioShowFormType.ts";
import {useDialog} from "../../../shared/hooks/useDialog.ts";

export const useRadioShowDetail = () => {
    const {state} = useLocation();
    const isNew = state.radioShow.id === "new";
    const {triggerDialog} = useDialog();

    const emptyShow: RadioShow = {
        id: "new",
        title: "",
        durationMin: 0
    }

    const [show, setShow] = useState<RadioShow>(isNew ? emptyShow : state.radioShow);
    const [loading, setLoading] = useState<boolean>(!isNew);

    useEffect(() => {
        if (isNew) {
            return;
        }

        radioShowService.getRadioShow(state.radioShow.id)
            .then(data => {
                setShow(data);
                setLoading(false);
            })
    }, [isNew, state.radioShow.id]);

    const saveShow = async (formData: RadioShowFormType) => {
        await radioShowService.createRadioShow(formData).then((createdRadioShow) => {
            setShow(createdRadioShow);
            triggerDialog({
                title: "Success",
                message: "Created show",
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

    const updateShow = async (formData: RadioShowFormType) => {
        await radioShowService.updateRadioShow(show.id, formData).then((updatedRadioShow) => {
            setShow(updatedRadioShow);
            triggerDialog({
                title: "Success",
                message: "Updated show",
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

    return {show, loading, isNew, saveShow, updateShow};
}