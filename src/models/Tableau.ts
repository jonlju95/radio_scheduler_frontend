import type {Timeslot} from "./Timeslot.ts";

export interface Tableau {
    id: string;
    date: string;
    scheduleId: string;
    timeslots: Timeslot[];
}