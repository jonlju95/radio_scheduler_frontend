import {useEffect, useState} from "react";
import type {Tableau} from "../../../../models/Tableau.ts";
import {apiClient} from "../../../../api/apiClient.ts";
import {useNavigate} from "react-router-dom";
import DatePicker from "../../../components/datePicker/DatePicker.tsx";
import ContentHeader from "../../../components/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../components/contentBody/ContentBody.tsx";

const TableauList = () => {
    const [tableau, setTableau] = useState<Tableau[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getTableaux = () => {
            apiClient.get<Tableau[]>("/tableaux")
                .then(res => {
                    setTableau(res.data);
                    setLoading(false);
                });
        }
        getTableaux();
    }, []);

    const handleSelect = ((date: Date) => {
        apiClient.get<Tableau>(`/tableaux/daily`, {date: String(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())})
            .then(res => {
                if (res.data) {
                    navigate(`/tableau/${res.data.id}`, {state: {row: res.data}});
                }
            })
    })

    if (loading) {
        return <div>Loading...</div>;
    }

    if (tableau.length === 0) {
        return (
            <p>No tableaux found</p>
        )
    }

    return (
        <div className={"content"}>
            <ContentHeader title={"Tableau"}/>
            <ContentBody>
                <DatePicker onSelect={(date) => handleSelect(date)}/>
            </ContentBody>
        </div>
    )
}

export default TableauList;