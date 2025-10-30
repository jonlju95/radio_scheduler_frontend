import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import type {Studio} from "../../../../models/Studio.ts";
import {apiClient} from "../../../../api/apiClient.ts";
import Input from "../../../components/input/Input.tsx";
import {useDialog} from "../../../../contexts/DialogContext.tsx";
import ContentHeader from "../../../components/contentHeader/ContentHeader.tsx";
import Button from "../../../components/button/Button.tsx";
import ContentBody from "../../../components/contentBody/ContentBody.tsx";

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

    const saveStudio = (formData: FormData) => {
        const updatedStudio = {
            id: !isNew ? studio.id : undefined,
            name: formData.get("studioName") as string,
            bookingPrice: Number(formData.get("studioPrice")),
            capacity: Number(formData.get("studioCapacity")),
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
                    <form onSubmit={e => {
                        e.preventDefault();
                        saveStudio(new FormData(e.currentTarget))
                    }}>
                        <Input inputLabel={"Name"} inputType={"text"} inputName={"studioName"}
                               value={studio?.name}
                               onChange={(e) => {
                                   setStudio({...studio, name: e.target.value})
                               }} required/>
                        <Input inputLabel={"Booking price"} inputType={"text"} inputName={"studioPrice"}
                               value={studio?.bookingPrice}
                               onChange={(e) => {
                                   setStudio({...studio, bookingPrice: Number(e.target.value)})
                               }} required/>
                        <Input inputLabel={"Capacity"} inputType={"text"} inputName={"studioCapacity"}
                               value={studio?.capacity}
                               onChange={(e) => {
                                   setStudio({...studio, capacity: Number(e.target.value)})
                               }} required/>
                        <Button btnLabel={"Submit"} btnType="submit" btnClasses={["btn-primary"]}/>
                    </form>
                )}
            </ContentBody>
        </div>
    );
};

export default StudioDetail;