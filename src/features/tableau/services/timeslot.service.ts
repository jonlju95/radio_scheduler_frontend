import type {Timeslot} from "../models/Timeslot.ts";
import {apiClient} from "../../../api/apiClient.ts";
import type {TimeslotFormType} from "../models/TimeslotFormType.ts";
import type {Tableau} from "../models/Tableau.ts";
import {mapCreateFormToTimeslot} from "../mappers/timeslot.mapper.ts";

class TimeslotService {
    async createTimeslot(formData: TimeslotFormType, tableau: Tableau): Promise<Timeslot> {
        const timeslot = mapCreateFormToTimeslot(formData, tableau);

        const {data} = await apiClient.post<Timeslot>(`/timeslots`, timeslot);

        return data;
    }

    async updateTimeslot(id: string, timeslotData: TimeslotFormType, tableau: Tableau): Promise<Timeslot> {
        const timeslot = mapCreateFormToTimeslot(timeslotData, tableau);

        console.log(timeslot);

        const {data} = await apiClient.put<Timeslot>(`/timeslots/${id}`, timeslot);

        return data;
    }
}

export const timeslotService = new TimeslotService();