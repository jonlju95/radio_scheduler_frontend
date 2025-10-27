import {useLocation, useNavigate} from "react-router-dom";
import type {RadioShow} from "../../../../models/RadioShow.ts";
import {useEffect, useState} from "react";
import {useDialog} from "../../../../contexts/DialogContext.tsx";
import {apiClient} from "../../../../api/apiClient.ts";
import Input from "../../../components/input/Input.tsx";

const RadioShowDetail = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
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

    const saveShow = (formData: FormData) => {
        const updatedShow = {
            id: !isNew ? show.id : undefined,
            title: formData.get("title") as string,
            durationMin: Number(formData.get("durationMin")),
        }

        if (!isNew) {
            const hasChanged = Object.keys(updatedShow).some(
                (key) => (updatedShow as never)[key] !== (originalShow as never)[key]
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
            apiClient.post<RadioShow>(`/radioShows/${show.id}`, updatedShow).then(r => {
                setShow(r.data);
                setOriginalShow(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Show created",
                    classes: "success"
                });
            });
        } else {
            apiClient.put<RadioShow>(`/radioShows/${show.id}`, updatedShow).then(r => {
                setShow(r.data);
                setOriginalShow(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Show updated",
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
                    <h3>{isNew ? "New show" : show?.title}</h3></div>
            </div>
            <div className="mainContainer">
                <form onSubmit={e => {
                    e.preventDefault();
                    saveShow(new FormData(e.currentTarget))
                }}>
                    <div>
                        <Input inputLabel={"Title"} inputType={"text"} inputName={"title"}
                               value={show?.title}
                               onChange={(e) => {
                                   setShow({...show, title: e.target.value})
                               }} required/>
                        <Input inputLabel={"Duration (min)"} inputType={"number"} inputName={"durationMin"}
                               value={show?.durationMin}
                               onChange={(e) => {
                                   setShow({...show, durationMin: Number(e.target.value)})
                               }} required/>
                    </div>
                    <button type="submit" className={"btn btn-primary"}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RadioShowDetail;