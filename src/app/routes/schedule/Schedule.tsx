import Table from "../../components/table/Table.tsx";

const Schedule = () => {
    return (
        <Table headers={[
            {key: "name", label: "Name"},
            {key: "bookingPrice", label: "Booking price"},
            {key: "capacity", label: "Capacity"}
        ]}
               data={[{id: "id", name: "Studio 1", bookingPrice: 199, capacity: 1},
                   {id: "id2", name: "Studio 2", bookingPrice: 399, capacity: 2},{id: "id", name: "Studio 1", bookingPrice: 199, capacity: 1},
                   {id: "id2", name: "Studio 2", bookingPrice: 399, capacity: 2},{id: "id", name: "Studio 1", bookingPrice: 199, capacity: 1},
                   {id: "id2", name: "Studio 2", bookingPrice: 399, capacity: 2},{id: "id", name: "Studio 1", bookingPrice: 199, capacity: 1},
                   {id: "id2", name: "Studio 2", bookingPrice: 399, capacity: 2}]}></Table>
    )
}

export default Schedule;
