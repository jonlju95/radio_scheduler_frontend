import {useNavigate} from "react-router-dom";
import DatePicker from "../../../features/tableau/components/DatePicker.tsx";
import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import {tableauService} from "../../../features/tableau/services/tableau.service.ts";

const TableauList = () => {
    const navigate = useNavigate();

    const handleSelect = (async (date: Date) => {
        await tableauService.getDailyTableau(date).then(data => {
            if (data) {
                navigate(`${data.id}`, {state: {row: data}});
            }
        });
    })

    return (
        <div className={"content"}>
            <ContentHeader title={"DailyTableau"}/>
            <ContentBody>
                <DatePicker onSelect={(date) => handleSelect(date)}/>
            </ContentBody>
        </div>
    )
}

export default TableauList;