import type {StudioFormType} from "../models/StudioFormType.ts";
import type {Studio} from "../models/Studio.ts";
import type {DefaultValues} from "react-hook-form";

export const mapStudioToForm = (studio: Studio): DefaultValues<StudioFormType> => {
    return {
        name: studio?.name,
        bookingPrice: studio?.bookingPrice,
        capacity: studio?.capacity,
    }
}

export const mapFormToStudio = (
    formData: StudioFormType
): Partial<Studio> => {
    return {
        name: formData.name,
        bookingPrice: formData.bookingPrice,
        capacity: formData.capacity,
    }
}