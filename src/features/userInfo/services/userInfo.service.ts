import type {User} from "../models/User.ts";
import {apiClient} from "../../../api/apiClient.ts";
import type {UserFormType} from "../models/UserFormType.ts";
import {mapFormToUser} from "../mappers/userInfo.mapper.ts";

class UserInfoService {
    async getUsers(): Promise<User[]> {
        const {data} = await apiClient.get<User[]>(`/users`);

        return data;
    }

    async getUser(id: string): Promise<User> {
        const {data} = await apiClient.get<User>(`/users/${id}`);

        return data;
    }

    async createUser(formData: UserFormType): Promise<User> {
        const user = mapFormToUser(formData);

        const {data} = await apiClient.post<User>(`/users`, user);

        return data;
    }

    async updateUser(id: string, formData: UserFormType): Promise<User> {
        const user = mapFormToUser(formData);

        const {data} = await apiClient.put<User>(`/users/${id}`, user);
        return data;
    }
}

export const userInfoService = new UserInfoService();