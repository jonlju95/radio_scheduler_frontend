import type {DefaultValues} from "react-hook-form";
import type {CreateTimeslotFormType} from "../models/CreateTimeslotFormType.ts";
import type {Timeslot} from "../models/Timeslot.ts";
import type {Tableau} from "../models/Tableau.ts";

export const toTime = (isoString?: string) => {
    return isoString ? isoString.substring(11, 16) : "";
}

export const toDateTime = (
    date: Date,
    time: string
): string => {
    const [h, m] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(h + Math.abs(newDate.getTimezoneOffset() / 60));
    newDate.setMinutes(m);
    return newDate.toISOString();
};

export const mapTimeslotToForm = (
    timeslot: Timeslot): DefaultValues<CreateTimeslotFormType> => {
    const guests: {
        radioHostId: string
    }[] = timeslot.radioHosts.length > 1 ? [{radioHostId: timeslot.radioHosts[1]?.id}] : [];

    return {
        startTime: toTime(timeslot?.startTime),
        endTime: toTime(timeslot?.endTime),
        radioHostId: timeslot?.radioHosts?.[0]?.id,
        radioShowId: timeslot?.radioShowId,
        studioId: timeslot?.studioId,
        guests
    }
};

export const mapCreateFormToTimeslot = (
    form: CreateTimeslotFormType,
    tableau: Tableau
): Partial<Timeslot> => {
    const radioHostIds = Array.from(new Set([
        form.radioHostId,
        ...form.guests.map(g => g.radioHostId)
    ]));

    return {
        startTime: toDateTime(tableau.date, form.startTime),
        endTime: toDateTime(tableau.date, form.endTime),
        radioShowId: form.radioShowId,
        studioId: form.studioId,
        tableauId: tableau.id,
        radioHostIds
    }
};
