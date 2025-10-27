import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import type {Studio} from "../../../../models/Studio.ts";
import {apiClient} from "../../../../api/apiClient.ts";
import Input from "../../../components/input/Input.tsx";
import {useDialog} from "../../../../contexts/DialogContext.tsx";

const StudioDetail = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"container"}>
            <div className="headerContainer">
                <div className={"detailHeader"}>
                    <svg
                        onClick={() => navigate(-1)}
                        viewBox="-4 -4 32 32"
                        id="chevron"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 6.1428817,1.0000087 17.857157,12 6.1428817,22.999991"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            id="path1"/>
                    </svg>
                    <h3>{isNew ? "New studio" : studio?.name}</h3></div>
            </div>
            <div className="mainContainer">
                <form onSubmit={e => {
                    e.preventDefault();
                    saveStudio(new FormData(e.currentTarget))
                }}>
                    <div><Input inputLabel={"Name"} inputType={"text"} inputName={"studioName"}
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
                               }} required/></div>
                    <button type="submit" className={"btn btn-primary"}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default StudioDetail;