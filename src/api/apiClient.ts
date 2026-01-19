import http from "./http.ts";
import type {ApiResponse} from "./models/ApiResponse.ts";

const headers = {
    Authorization: "Bearer " + localStorage.getItem("authToken"),
    "Content-Type": "application/json"
};

export const apiClient = {
    get: async <T>(url: string, params?: T) => {
        const res = await http.get<ApiResponse<T>>(url, {headers, params});
        return res.data;
    },

    post: async <T>(url: string, body: T) => {
        const res = await http.post<ApiResponse<T>>(url, body, {headers});
        return res.data;
    },

    put: async <T>(url: string, body?: T) => {
        const res = await http.put<ApiResponse<T>>(url, body, {headers});
        return res.data;
    },

    delete: async <T>(url: string) => {
        const res = await http.delete<ApiResponse<T>>(url, {headers});
        return res.data;
    },
};