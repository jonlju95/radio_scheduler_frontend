import Table from "../../../components/table/Table.tsx";
import {useEffect, useState} from "react";
import type {Tableau} from "../../../../models/Tableau.ts";
import {apiClient} from "../../../../api/apiClient.ts";
import {Outlet, useNavigate} from "react-router-dom";

const tableHeaders = [
    {key: "id", label: "Id"},
    {key: "date", label: "Date"},
    {key: "scheduleId", label: "Schedule id"},
] as const;

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (tableau.length === 0) {
        return (
            <p>No tableaux found</p>
        )
    }

    return (
        <>
            <Table headers={tableHeaders} data={tableau}
                   onRowClick={(row) => navigate(`/tableau/${row.id}`, {state: {row}})}></Table>
            <Outlet/>
        </>
    )
}

export default TableauList;