import {useLocation, useNavigate} from "react-router-dom";
import type {Tableau} from "../../../../models/Tableau.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";
import {useDialog} from "../../../../contexts/DialogContext.tsx";

const TableauDetail = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
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
                    <h3>{isNew ? "New tableau" : String(tableau?.date)}</h3></div>
            </div>
            <div className="mainContainer">
                {/*<form onSubmit={e => {*/}
                {/*    e.preventDefault();*/}
                {/*    saveStudio(new FormData(e.currentTarget))*/}
                {/*}}>*/}
                {/*    <div><Input inputLabel={"Name"} inputType={"text"} inputName={"studioName"}*/}
                {/*                value={studio?.name}*/}
                {/*                onChange={(e) => {*/}
                {/*                    setStudio({...studio, name: e.target.value})*/}
                {/*                }} required/>*/}
                {/*        <Input inputLabel={"Booking price"} inputType={"text"} inputName={"studioPrice"}*/}
                {/*               value={studio?.bookingPrice}*/}
                {/*               onChange={(e) => {*/}
                {/*                   setStudio({...studio, bookingPrice: Number(e.target.value)})*/}
                {/*               }} required/>*/}
                {/*        <Input inputLabel={"Capacity"} inputType={"text"} inputName={"studioCapacity"}*/}
                {/*               value={studio?.capacity}*/}
                {/*               onChange={(e) => {*/}
                {/*                   setStudio({...studio, capacity: Number(e.target.value)})*/}
                {/*               }} required/></div>*/}
                {/*    <button type="submit" className={"btn btn-primary"}>Submit</button>*/}
                {/*</form>*/}
            </div>
        </div>
    )
};

export default TableauDetail;