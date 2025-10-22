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
            let isMounted: boolean = true;
            getRadioHosts(isMounted).then(() => {
                isMounted = false;
            });
        }, []);

        const getRadioHosts = async (isMounted: boolean) => {
            try {
                apiClient.get<RadioShow[]>("/radioShows")
                    .then((response) => {
                        if (isMounted) {
                            setRadioShows(response.data);
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
                {radioShows.length === 0 ? (
                    <p>No radio shows found</p>
                ) : (
                    <>
                        <Table headers={tableHeaders} data={radioShows}
                               onRowClick={(row) => navigate(`/shows/${row.id}`, {state: {row}})}></Table>
                        <Outlet/>
                    </>
                )}
            </>
        );
    }
;

export default RadioShowList;