import type {Role} from "../Role.ts";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    createdAt: Date;
    roles: Role[];
}