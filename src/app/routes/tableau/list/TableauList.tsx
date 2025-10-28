import {useEffect, useState} from "react";
import type {Tableau} from "../../../../models/Tableau.ts";
import {apiClient} from "../../../../api/apiClient.ts";
import {useNavigate} from "react-router-dom";
import DatePicker from "../../../components/datePicker/DatePicker.tsx";

// const tableHeaders = [
//     {key: "id", label: "Id"},
//     {key: "date", label: "Date"},
//     {key: "scheduleId", label: "ScheduleLayout id"},
// ] as const;

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
        <div className={"container"}>
            <div className="headerContainer">
                <h3>Tableau</h3>
            </div>
            <div className="mainContainer">
                <DatePicker onSelect={(date) => handleSelect(date)}/>
                {/*<Table headers={tableHeaders} data={tableau}*/}
                {/*       onRowClick={(row) => navigate(`/tableau/${row.id}`, {state: {row}})}></Table>*/}
            </div>
        </div>
    )
}

export default TableauList;