import type {Timeslot} from "../models/Timeslot.ts";
import TimeslotCard from "./TimeslotCard.tsx";

interface Props {
    timeslots: Timeslot[];
    onEdit: (timeslot: Timeslot) => void;
}

const parseTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return (
        String(date.getHours()).padStart(2, "0") +
        ":" +
        String(date.getMinutes()).padStart(2, "0")
    );
};

const TimeslotList = ({timeslots, onEdit}: Props) => {
    if (timeslots.length === 0) {
        return <p>No timeslots added</p>;
    }

    return (
        <>
            {timeslots.map((t) => (
                <TimeslotCard
                    key={t.id}
                    startTime={parseTime(t.startTime)}
                    showTitle={t.radioShow?.title}
                    studioName={t.studio?.name}
                    hosts={t.radioHosts}
                    onClickAction={() => onEdit(t)}
                />
            ))}
        </>
    );
};

export default TimeslotList;