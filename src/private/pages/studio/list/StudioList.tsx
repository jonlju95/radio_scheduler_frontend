import {useEffect, useState} from "react";
import Table from "../../../../components/table/Table.tsx";
import {useNavigate} from "react-router-dom";
import {apiClient} from "../../../../api/apiClient.ts";
import type {Studio} from "../../../../models/Studio.ts";
import ContentHeader from "../../../../components/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../../components/contentBody/ContentBody.tsx";

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

    return (
        <div className={"content"}>
            <ContentHeader title={"Studios"} navTarget={"/studios/new"} btnLabel={"New studio"}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <Table headers={tableHeaders} data={studios}
                           onRowClick={(row) => navigate(`/studios/${row.id}`, {state: {row}})}></Table>
                )}
            </ContentBody>
        </div>
    );
}

export default StudioList;
