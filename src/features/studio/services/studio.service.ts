import {apiClient} from "../../../api/apiClient.ts";
import type {Studio} from "../models/Studio.ts";
import type {CreateStudioFormType} from "../models/CreateStudioFormType.ts";
import {mapCreateFormToStudio} from "../mappers/studio.mapper.ts";

class StudioService {
    async getStudios(): Promise<Studio[]> {
        const {data} = await apiClient.get<Studio[]>(`/studios`);

        return data;
    }

    async getStudio(id: string): Promise<Studio> {
        const {data} = await apiClient.get<Studio>(`/studios/${id}`);

        return data;
    }

    async createStudio(formData: CreateStudioFormType): Promise<Studio> {
        const studio = mapCreateFormToStudio(formData);

        const {data} = await apiClient.post<Studio>(`/studios`, studio);

        return data;
    }

    async updateStudio(formData: CreateStudioFormType): Promise<Studio> {
        const studio = mapCreateFormToStudio(formData);

        const {data} = await apiClient.put<Studio>(`/studios`, studio);

        return data;
    }
}

export const studioService = new StudioService();