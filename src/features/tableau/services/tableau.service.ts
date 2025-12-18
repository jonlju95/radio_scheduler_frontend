import type {Tableau} from "../models/Tableau.ts";
import {apiClient} from "../../../api/apiClient.ts";

class TableauService {
    async getTableau(id: string): Promise<Tableau> {
        const {data} = await apiClient.get<Tableau>(`/tableaux/${id}`);

        return data;
    }

    async getDailyTableau(tableauDate: Date): Promise<Tableau> {
        const parsedDate = String(tableauDate.getFullYear() + "-"
            + (tableauDate.getMonth() + 1) + "-" + tableauDate.getDate());
        const { data } = await apiClient.get<Tableau>(`/tableaux/daily`, {date: parsedDate});
        return data;
    }
}

export const tableauService = new TableauService();