import {useLocation, useNavigate} from "react-router-dom";
import type {Tableau} from "../../../../models/Tableau.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";
import {useDialog} from "../../../../contexts/DialogContext.tsx";
import ContentHeader from "../../../components/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../components/contentBody/ContentBody.tsx";

const TableauDetail = () => {
    const {state} = useLocation();
    const isNew = state.row.id === "new";

    const emptyTableau: Tableau = {
        id: "new",
        date: new Date(Date.now()),
        timeslots: []
    };

    const [tableau, setTableau] = useState<Tableau>(isNew ? emptyTableau : state.row);
    const [originalTableau, setOriginalTableau] = useState<Tableau>(isNew ? emptyTableau : state.row);
    const [loading, setLoading] = useState(!isNew);

    const {triggerDialog} = useDialog();

    useEffect(() => {
        if (!isNew) {
            apiClient.get<Tableau>(`/tableaux/${tableau.id}`)
                .then(response => {
                    setTableau(response.data);
                    setOriginalTableau(response.data);
                    setLoading(false);
                });
        }
    }, [isNew, tableau.id]);

    const saveTableau = (formData: FormData) => {};

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New tableau" : String(tableau?.date)}`} detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <></>
                )}
            </ContentBody>
        </div>
    )
};

export default TableauDetail;