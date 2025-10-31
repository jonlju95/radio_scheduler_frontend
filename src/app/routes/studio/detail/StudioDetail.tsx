import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import type {Studio} from "../../../../models/Studio.ts";
import {apiClient} from "../../../../api/apiClient.ts";
import ContentHeader from "../../../components/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../components/contentBody/ContentBody.tsx";
import {useDialog} from "../../../../contexts/UseDialog.tsx";
import FormWrapper from "../../../components/FormWrapper.tsx";
import InputField from "../../../components/InputField.tsx";

const StudioDetail = () => {
    const {state} = useLocation();
    const isNew = state.row.id === "new";

    // Default studio
    const emptyStudio: Studio = {
        id: "new",
        name: "",
        bookingPrice: 0,
        capacity: 0
    };

    const [studio, setStudio] = useState<Studio>(isNew ? emptyStudio : state.row);
    const [originalStudio, setOriginalStudio] = useState<Studio>(isNew ? emptyStudio : state.row);
    const [loading, setLoading] = useState(!isNew);

    const {triggerDialog} = useDialog();

    useEffect(() => {
        if (!isNew) {
            apiClient.get<Studio>(`/studios/${studio.id}`)
                .then(response => {
                    setStudio(response.data);
                    setOriginalStudio(response.data);
                    setLoading(false);
                });
        }
    }, [isNew, studio.id])

    const saveStudio = (data: Studio) => {
        const updatedStudio = {
            ...data,
            id: !isNew ? studio.id : undefined
        }

        if (!isNew) {
            const hasChanged = Object.keys(updatedStudio).some(
                key => (updatedStudio as never)[key] !== (originalStudio as never)[key]
            );

            if (!hasChanged) {
                triggerDialog({
                    title: "Warning",
                    message: "No changes detected",
                    classes: "warning"
                });
                return;
            }
        }

        if (isNew) {
            apiClient.post<Studio>(`/studios`, updatedStudio).then(r => {
                setStudio(r.data);
                setOriginalStudio(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Studio created",
                    classes: "success"
                });
            });
        } else {
            apiClient.put<Studio>(`/studios/${studio.id}`, updatedStudio).then(r => {
                setStudio(r.data);
                setOriginalStudio(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Studio updated",
                    classes: "success"
                });
            });
        }
    }

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New studio" : studio?.name}`}
                           detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <FormWrapper<Studio> defaultValues={studio} onSubmit={saveStudio}>
                        <InputField<Studio> name={"name"} label={"Name"} required/>
                        <InputField<Studio> name={"bookingPrice"} label={"Booking price"} required/>
                        <InputField<Studio> name={"capacity"} label={"Capacity"} required/>
                    </FormWrapper>
                )}
            </ContentBody>
        </div>
    );
};

export default StudioDetail;