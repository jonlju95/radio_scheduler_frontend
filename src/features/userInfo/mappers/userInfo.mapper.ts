import type {User} from "../models/User.ts";
import type {UserFormType} from "../models/UserFormType.ts";

export const mapUserToForm = (user: User | null) => {
    return {
        ...user,
    }
}

export const mapFormToUser = (
    formData: UserFormType, id?: string
): Partial<User> => {
    return {
        ...formData,
        id: id,
    }
}