import {apiClient} from "../../../api/apiClient.ts";
import type {Studio} from "../models/Studio.ts";
import type {StudioFormType} from "../models/StudioFormType.ts";
import {mapFormToStudio} from "../mappers/studio.mapper.ts";

class StudioService {
    async getStudios(): Promise<Studio[]> {
        const {data} = await apiClient.get<Studio[]>(`/studios`);

        return data;
    }

    async getStudio(id: string): Promise<Studio> {
        const {data} = await apiClient.get<Studio>(`/studios/${id}`);

        return data;
    }

    async createStudio(formData: StudioFormType): Promise<Studio> {
        const studio = mapFormToStudio(formData);

        const {data} = await apiClient.post<Studio>(`/studios`, studio);

        return data;
    }

    async updateStudio(id: string, formData: StudioFormType): Promise<Studio> {
        const studio = mapFormToStudio(formData);

        const {data} = await apiClient.put<Studio>(`/studios/${id}`, studio);

        return data;
    }
}

export const studioService = new StudioService();