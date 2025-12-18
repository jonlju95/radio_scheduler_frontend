import Table from "../../../shared/components/Table.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {RadioShow} from "../../../features/radioShow/models/RadioShow.ts";
import {apiClient} from "../../../api/apiClient.ts";
import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";

const tableHeaders = [
    {key: "id", label: "Id"},
    {key: "title", label: "Title"},
    {key: "durationMin", label: "Duration (minutes)"}
] as const;

const RadioShowList = () => {
    const [radioShows, setRadioShows] = useState<RadioShow[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getRadioShows = () => {
            apiClient.get<RadioShow[]>("/radioShows")
                .then((response) => {
                    setRadioShows(response.data);
                    setLoading(false);
                });
        }
        getRadioShows();
    }, []);


    return (
        <div className={"content"}>
            <ContentHeader title={"Shows"} navTarget={"/admin/shows/new"} btnLabel={"New show"}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <Table headers={tableHeaders} data={radioShows}
                           onRowClick={(row) => navigate(`/shows/${row.id}`, {state: {row}})}></Table>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioShowList;