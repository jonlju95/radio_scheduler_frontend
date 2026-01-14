import type {RadioHost} from "../models/RadioHost.ts";
import type {RadioHostFormType} from "../models/RadioHostFormType.ts";

export const mapRadioHostToForm = (radioHost: RadioHost) => {
    return {
        firstName: radioHost?.firstName,
        lastName: radioHost?.lastName,
        isGuest: radioHost?.isGuest,
    }
}

export const mapFormToRadioHost = (
    formData: RadioHostFormType, id?: string
): Partial<RadioHost> => {
    return {
        id: id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isGuest: formData.isGuest,
    }
}