import {useEffect, useState} from "react";
import type {RadioHost} from "../../../../models/RadioHost.ts";
import {Outlet, useNavigate} from "react-router-dom";
import Table from "../../../components/table/Table.tsx";
import {apiClient} from "../../../../api/apiClient.ts";

const tableHeaders = [
    {key: "id", label: "Id"},
    {key: "firstName", label: "First name"},
    {key: "lastName", label: "Last name"},
    {key: "isGuest", label: "Guest"}
] as const;

const RadioHostList = () => {
    const [radioHosts, setRadioHosts] = useState<RadioHost[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getRadioHosts = () => {
            apiClient.get<RadioHost[]>(`/radioHosts`)
                .then((response) => {
                    setRadioHosts(response.data);
                    setLoading(false);
                });
        }
        getRadioHosts();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"container"}>
            <div className={"headerContainer"}>
                <h3>Hosts</h3>
                <button className={"btn btn-primary"}
                        onClick={() => navigate(`/hosts/new`, {state: {row: {id: "new"}}})}>New host
                </button>
            </div>
            <div className={"mainContainer"}>
                {radioHosts.length === 0 ? (
                    <p>No studios found.</p>
                ) : (
                    <>
                        <Table headers={tableHeaders} data={radioHosts}
                               onRowClick={(row) => navigate(`/hosts/${row.id}`, {state: {row}})}></Table>
                        <Outlet/>
                    </>
                )}
            </div>
        </div>
    );
};

export default RadioHostList;