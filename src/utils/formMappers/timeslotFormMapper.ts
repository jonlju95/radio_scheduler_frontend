import type {DefaultValues} from "react-hook-form";
import type {TimeslotForm} from "../../models/form/TimeslotForm.ts";
import type {Timeslot} from "../../models/Timeslot.ts";

export const toTime = (isoString?: string) => {
    return isoString ? isoString.substring(11, 16) : "";
}

export const mapTimeslotToForm = (
    timeslot: Timeslot): DefaultValues<TimeslotForm> => ({
    startTime: toTime(timeslot?.startTime),
    endTime: toTime(timeslot?.endTime),
    radioHostId: timeslot?.radioHosts?.[0].id,
    radioShowId: timeslot?.radioShowId,
    studioId: timeslot?.studioId,
})