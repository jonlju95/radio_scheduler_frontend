import type {RadioShow} from "./RadioShow.ts";
import type {Studio} from "./Studio.ts";
import type {RadioHost} from "./RadioHost.ts";

export interface Timeslot {
    id: string;
    startTime: string;
    endTime: string;
    tableauId: string;
    hostIds: string[];
    radioHosts?: RadioHost[];
    radioShowId: string;
    radioShow?: RadioShow;
    studioId: string;
    studio?: Studio;
}