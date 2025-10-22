import {useEffect, useState} from "react";
import Table from "../../../components/table/Table.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {apiClient} from "../../../../api/apiClient.ts";

interface StudioLayout {
    id: string;
    name: string;
    bookingPrice: number;
    capacity: number;
}

const tableHeaders = [
    {key: "name", label: "Name"},
    {key: "bookingPrice", label: "Booking price"},
    {key: "capacity", label: "Capacity"},
] as const;


const StudioList = () => {
    const [studios, setStudios] = useState<StudioLayout[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        getStudios(isMounted).then(() => {
            isMounted = false;
        });
    }, []);

    const getStudios = async (isMounted: boolean) => {
        try {
            apiClient.get<StudioLayout[]>("/studios")
                .then((res) => {
                    if (isMounted) {
                        setStudios(res.data);
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
            {studios.length === 0 ? (
                <p>No studios found.</p>
            ) : (
                <>
                    <Table headers={tableHeaders} data={studios}
                           onRowClick={(row) => navigate(`/studios/${row.id}`, {state: {row}})}></Table>
                    <Outlet/>
                </>
                )}
        </>
    );
}

export default StudioList;