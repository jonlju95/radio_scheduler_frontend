import {useLocation} from "react-router-dom";
import type {Studio} from "../models/Studio.ts";
import {useEffect, useState} from "react";
import {studioService} from "../services/studio.service.ts";
import type {CreateStudioFormType} from "../models/CreateStudioFormType.ts";
import {useDialog} from "../../../shared/hooks/useDialog.ts";

export const useStudio = () => {
    const { state } = useLocation();
    const isNew = state.studio.id === "new";
    const {triggerDialog} = useDialog();

    const emptyStudio: Studio = {
        id: "new",
        name: "",
        bookingPrice: 0,
        capacity: 0,
    }

    const [studio, setStudio] = useState<Studio>(isNew ? emptyStudio : state.studio);
    const [loading, setLoading] = useState<boolean>(!isNew);

    useEffect(() => {
        if (isNew) {
            return;
        }

        studioService.getStudio(state.studio.id)
            .then(data => {
                setStudio(data);
                setLoading(false);
            })
    }, [isNew, state.studio.id]);

    const saveStudio = async (formData: CreateStudioFormType) => {
        await studioService.createStudio(formData).then((createdStudio: Studio) => {
            setStudio(createdStudio);
            triggerDialog({
                title: "Success",
                message: "Created studio",
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

    const updateStudio = async (formData: CreateStudioFormType) => {
        await studioService.updateStudio(formData).then((updatedStudio: Studio) => {
            setStudio(updatedStudio);
            triggerDialog({
                title: "Success",
                message: "Updated studio",
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

    return { studio, loading, isNew, saveStudio, updateStudio };
}