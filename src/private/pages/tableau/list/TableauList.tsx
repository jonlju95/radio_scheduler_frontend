import type {Tableau} from "../../../../models/Tableau.ts";
import {apiClient} from "../../../../api/apiClient.ts";
import {useNavigate} from "react-router-dom";
import DatePicker from "../../../../components/private/datePicker/DatePicker.tsx";
import ContentHeader from "../../../../components/private/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../../components/private/contentBody/ContentBody.tsx";

const TableauList = () => {
    const navigate = useNavigate();

    const handleSelect = ((date: Date) => {
        apiClient.get<Tableau>(`/tableaux/daily`, {date: String(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())})
            .then(res => {
                if (res.data) {
                    navigate(`${res.data.id}`, {state: {row: res.data}});
                }
            })
    })

    return (
        <div className={"content"}>
            <ContentHeader title={"Tableau"}/>
            <ContentBody>
                <DatePicker onSelect={(date) => handleSelect(date)}/>
            </ContentBody>
        </div>
    )
}

export default TableauList;