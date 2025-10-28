import type {Timeslot} from "./Timeslot.ts";

export interface Tableau {
    id: string;
    date: Date;
    timeslots: Timeslot[];
}