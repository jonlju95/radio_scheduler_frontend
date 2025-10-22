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
        let isMounted = true;
        getRadioHosts(isMounted).then(() => {
            isMounted = false;
        })
    }, []);

    const getRadioHosts = async (isMounted: boolean) => {
        try {
            apiClient.get<RadioHost[]>(`/radioHosts`)
                .then((response) => {
                    if (isMounted) {
                        setRadioHosts(response.data);
                    }
                });
        } catch (error) {
            console.log(error);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {radioHosts.length === 0 ? (
                <p>No studios found.</p>
            ) : (
                <>
                    <Table headers={tableHeaders} data={radioHosts}
                           onRowClick={(row) => navigate(`/hosts/${row.id}`, {state: {row}})}></Table>
                    <Outlet/>
                </>
            )}
        </>
    );
};

export default RadioHostList;