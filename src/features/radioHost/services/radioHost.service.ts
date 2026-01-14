import type {RadioHost} from "../models/RadioHost.ts";
import {apiClient} from "../../../api/apiClient.ts";
import type {RadioHostFormType} from "../models/RadioHostFormType.ts";
import {mapFormToRadioHost} from "../mappers/radioHost.mapper.ts";

class RadioHostService {
    async getRadioHosts(): Promise<RadioHost[]> {
        const {data} = await apiClient.get<RadioHost[]>(`/radioHosts`);
        return data;
    }

    async getRadioHost(id: string): Promise<RadioHost> {
        const {data} = await apiClient.get<RadioHost>(`/radioHosts/${id}`);
        return data;
    }

    async createRadioHost(formData: RadioHostFormType): Promise<RadioHost> {
        const radioHost = mapFormToRadioHost(formData);

        const {data} = await apiClient.post<RadioHost>(`/radioHosts`, radioHost);
        return data;
    }

    async updateRadioHost(id: string, formData: RadioHostFormType): Promise<RadioHost> {
        const radioHost = mapFormToRadioHost(formData, id);

        const {data} = await apiClient.put<RadioHost>(`/radioHosts/${id}`, radioHost);
        return data;
    }
}

export const radioHostService = new RadioHostService();