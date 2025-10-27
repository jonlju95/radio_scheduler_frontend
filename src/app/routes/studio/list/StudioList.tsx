import {useEffect, useState} from "react";
import Table from "../../../components/table/Table.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {apiClient} from "../../../../api/apiClient.ts";
import type {Studio} from "../../../../models/Studio.ts";

const tableHeaders = [
    {key: "id", label: "Id"},
    {key: "name", label: "Name"},
    {key: "bookingPrice", label: "Booking price"},
    {key: "capacity", label: "Capacity"},
] as const;


const StudioList = () => {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getStudios = () => {
            apiClient.get<Studio[]>("/studios")
                .then(response => {
                    setStudios(response.data);
                    setLoading(false);
                });
        }
        getStudios();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"container"}>
            <div className="headerContainer">
                <h3>Studios</h3>
                <button className={"btn btn-primary"} onClick={() => navigate(`/studios/new`, {state: {row: {id: "new"}}})}>New studio</button>
            </div>
            <div className="mainContainer">
                {studios.length === 0 ? (
                    <p>No studios found.</p>
                ) : (
                    <>
                        <Table headers={tableHeaders} data={studios}
                               onRowClick={(row) => navigate(`/studios/${row.id}`, {state: {row}})}></Table>
                        <Outlet/>
                    </>
                )}
            </div>
        </div>
    );
}

export default StudioList;
