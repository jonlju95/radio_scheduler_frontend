import type {RadioShowFormType} from "../models/RadioShowFormType.ts";
import type {RadioShow} from "../models/RadioShow.ts";

export const mapRadioShowToForm = (radioShow: RadioShow) => {
    return {
        title: radioShow?.title,
        durationMin: radioShow?.durationMin,
    }
}

export const mapFormToRadioShow = (
    formData: RadioShowFormType, id?: string
): Partial<RadioShow> => {
    return {
        id: id,
        title: formData.title,
        durationMin: formData.durationMin,
    }
}