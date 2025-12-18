import {useLocation} from "react-router-dom";
import type {RadioShow} from "../../../features/radioShow/models/RadioShow.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../api/apiClient.ts";
import InputField from "../../../shared/components/InputField.tsx";
import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import {useDialog} from "../../../shared/hooks/useDialog.ts";
import FormWrapper from "../../../shared/components/FormWrapper.tsx";

const RadioShowDetail = () => {
    const {state} = useLocation();
    const isNew = state.row.id === "new";

    const emptyShow: RadioShow = {
        id: "new",
        title: "",
        durationMin: 0
    }

    const [show, setShow] = useState<RadioShow>(isNew ? emptyShow : state.row);
    const [originalShow, setOriginalShow] = useState<RadioShow>(isNew ? emptyShow : state.row);
    const [loading, setLoading] = useState(!isNew);

    const {triggerDialog} = useDialog();

    useEffect(() => {
        if (!isNew) {
            apiClient.get<RadioShow>(`/radioShows/${show.id}`)
                .then(response => {
                    setShow(response.data);
                    setOriginalShow(response.data);
                    setLoading(false);
                });
        }
    }, [isNew, show.id]);

    const saveShow = (data: RadioShow) => {
        const updatedShow = {
            ...data,
            id: !isNew ? show.id : undefined,
        }

        if (!isNew) {
            const hasChanged = Object.keys(updatedShow).some(
                (key) => (updatedShow as never)[key] !== (originalShow as never)[key]
            );

            if (!hasChanged) {
                triggerDialog({
                    title: "Warning",
                    message: "No changes detected",
                    variant: "warning"
                });
                return;
            }
        }

        if (isNew) {
            apiClient.post<RadioShow>(`/radioShows/${show.id}`, updatedShow).then(r => {
                setShow(r.data);
                setOriginalShow(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Show created",
                    variant: "success",

                });
            });
        } else {
            apiClient.put<RadioShow>(`/radioShows/${show.id}`, updatedShow).then(r => {
                setShow(r.data);
                setOriginalShow(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Show updated",
                    variant: "success"
                });
            });
        }
    }

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New show" : show?.title}`}
                           detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <FormWrapper defaultValues={show} onSubmit={saveShow}>
                        <InputField name={"title"} label={"Title"}/>
                        <InputField name={"durationMin"} label={"Duration (min)"}/>
                    </FormWrapper>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioShowDetail;