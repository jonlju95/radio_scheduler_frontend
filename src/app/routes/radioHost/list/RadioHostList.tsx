import {useEffect, useState} from "react";
import type {RadioHost} from "../../../../models/RadioHost.ts";
import {useNavigate} from "react-router-dom";
import Table from "../../../components/table/Table.tsx";
import {apiClient} from "../../../../api/apiClient.ts";
import ContentHeader from "../../../components/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../components/contentBody/ContentBody.tsx";

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

    return (
        <div className={"content"}>
            <ContentHeader title={"Hosts"} navTarget={"/hosts/new"} btnLabel={"New host"}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <Table headers={tableHeaders} data={radioHosts}
                           onRowClick={(row) => navigate(`/hosts/${row.id}`, {state: {row}})}></Table>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioHostList;