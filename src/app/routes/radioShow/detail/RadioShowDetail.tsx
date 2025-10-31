import {useLocation} from "react-router-dom";
import type {RadioShow} from "../../../../models/RadioShow.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";
import InputField from "../../../components/InputField.tsx";
import ContentHeader from "../../../components/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../components/contentBody/ContentBody.tsx";
import {useDialog} from "../../../../contexts/UseDialog.tsx";
import FormWrapper from "../../../components/FormWrapper.tsx";

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
                    // <form onSubmit={e => {
                    //     e.preventDefault();
                    //     saveShow(new FormData(e.currentTarget))
                    // }}>
                    //     <InputField inputLabel={"Title"} inputType={"text"} inputName={"title"}
                    //                 value={show?.title}
                    //                 onChange={(e) => {
                    //                setShow({...show, title: e.target.value})
                    //            }} required/>
                    //     <InputField inputLabel={"Duration (min)"} inputType={"number"} inputName={"durationMin"}
                    //                 value={show?.durationMin}
                    //                 onChange={(e) => {
                    //                setShow({...show, durationMin: Number(e.target.value)})
                    //            }} required/>
                    //     <Button btnLabel={"Submit"} btnType="submit" btnClasses={["btn-primary"]}/>
                    // </form>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioShowDetail;