import http from "./http.ts";
import type {ApiResponse} from "./models/ApiResponse.ts";

export const apiClient = {
    get: async <T>(url: string, params?: object) => {
        const res = await http.get<ApiResponse<T>>(url, {params});
        return res.data;
    },

    post: async <T>(url: string, body?: object) => {
        const res = await http.post<ApiResponse<T>>(url, body);
        return res.data;
    },

    put: async <T>(url: string, body?: object) => {
        const res = await http.put<ApiResponse<T>>(url, body);
        return res.data;
    },

    delete: async <T>(url: string) => {
        const res = await http.delete<ApiResponse<T>>(url);
        return res.data;
    },
};