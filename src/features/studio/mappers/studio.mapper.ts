import type {CreateStudioFormType} from "../models/CreateStudioFormType.ts";
import type {Studio} from "../models/Studio.ts";
import type {DefaultValues} from "react-hook-form";

export const mapStudioToForm = (studio: Studio): DefaultValues<CreateStudioFormType> => {
    return {
        name: studio?.name,
        bookingPrice: studio?.bookingPrice,
        capacity: studio?.capacity,
    }
}

export const mapCreateFormToStudio = (
    formData: CreateStudioFormType
): Partial<Studio> => {
    return {
        name: formData.name,
        bookingPrice: formData.bookingPrice,
        capacity: formData.capacity,
    }
}