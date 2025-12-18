import type {RadioShow} from "../../radioShow/models/RadioShow.ts";
import type {Studio} from "../../studio/models/Studio.ts";
import type {RadioHost} from "../../radioHost/models/RadioHost.ts";

export interface Timeslot {
    id: string;
    startTime: string;
    endTime: string;
    tableauId: string;
    radioHostIds: string[];
    radioHosts: RadioHost[];
    radioShowId: string;
    radioShow?: RadioShow;
    studioId: string;
    studio?: Studio;
}