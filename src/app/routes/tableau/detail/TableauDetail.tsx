import {useLocation} from "react-router-dom";
import type {Tableau} from "../../../../models/Tableau.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";

const TableauDetail = () => {
    const [loading, setLoading] = useState(true);

    const {state} = useLocation();
    const tableau: Tableau = state.row;

    useEffect(() => {
        let isMounted = true;

        async function fetchTimeslots() {
            try {
                apiClient.get<Tableau>(`/tableaus/${tableau.id}`)
                    .then(res => {
                        if (isMounted) {
                            tableau.timeslots = res.data.timeslots
                        }
                    })
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchTimeslots();

        return () => {
            isMounted = false;
        };
    })

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <p>Tableau detail</p>
    )
};

export default TableauDetail;