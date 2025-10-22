import {useEffect, useState} from "react";
import axios from "axios";
import Table from "../../components/table/Table.tsx";
import type {ApiResponse} from "../../../models/api/ApiResponse.ts";

interface Studio {
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


const Studio = () => {
    const [studios, setStudios] = useState<Studio[]>([]);

    useEffect(() => {
        getStudios();
    }, []);

    const getStudios = async () => {
        axios.get<ApiResponse<Studio[]>>("https://localhost:7288/v1/studios")
            .then((res) => {
                setStudios(res.data.data);
            });
    }

    if (studios.length === 0) {
        return (
            <>
                <p>No studios found.</p>
            </>
        )
    }

    return (
        <>
            <h1>Studios</h1>
            <Table headers={tableHeaders} data={studios}/>
        </>
    )
}

export default Studio;