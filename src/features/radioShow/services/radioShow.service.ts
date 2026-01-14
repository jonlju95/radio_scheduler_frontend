import type {RadioShow} from "../models/RadioShow.ts";
import {apiClient} from "../../../api/apiClient.ts";
import type {RadioShowFormType} from "../models/RadioShowFormType.ts";
import {mapFormToRadioShow} from "../mappers/radioShow.mapper.ts";

class RadioShowService {
    async getRadioShows(): Promise<RadioShow[]> {
        const {data} = await apiClient.get<RadioShow[]>(`/radioShows`);

        return data;
    }

    async getRadioShow(id: string): Promise<RadioShow> {
        const {data} = await apiClient.get<RadioShow>(`/radioShows/${id}`);

        return data;
    }

    async createRadioShow(formData: RadioShowFormType): Promise<RadioShow> {
        const radioShow = mapFormToRadioShow(formData);

        const {data} = await apiClient.post<RadioShow>(`/radioShows`, radioShow);

        return data;
    }

    async updateRadioShow(id: string, formData: RadioShowFormType): Promise<RadioShow> {
        const radioShow = mapFormToRadioShow(formData, id);

        const {data} = await apiClient.put<RadioShow>(`/radioShows/${id}`, radioShow);

        return data;
    }
}

export const radioShowService = new RadioShowService();