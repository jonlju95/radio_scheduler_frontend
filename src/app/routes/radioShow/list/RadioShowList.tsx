import Table from "../../../components/table/Table.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {RadioShow} from "../../../../models/RadioShow.ts";
import {apiClient} from "../../../../api/apiClient.ts";

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


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"container"}>
            <div className={"headerContainer"}>
                <h3>Shows</h3>
                <button className={"btn btn-primary"}
                        onClick={() => navigate(`/shows/new`, {state: {row: {id: "new"}}})}>New show
                </button>
            </div>
            <div className={"mainContainer"}>
                {radioShows.length === 0 ? (
                    <p>No studios found.</p>
                ) : (
                    <>
                        <Table headers={tableHeaders} data={radioShows}
                               onRowClick={(row) => navigate(`/shows/${row.id}`, {state: {row}})}></Table>
                        <Outlet/>
                    </>
                )}
            </div>
        </div>
    );
};

export default RadioShowList;