import type {Role} from "../../auth/models/Role.ts";

export type UserFormType = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    zipCode: string,
    createdAt: Date,
    roles: Role[]
}