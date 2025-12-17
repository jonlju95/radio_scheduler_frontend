import {useFormContext} from "react-hook-form";

export type Option = {
    label: string;
    value: string;
    selectedValue?: string;
};

const DropdownField = ({name, label, options}: {
    name: string;
    label: string;
    options: Option[];
}) => {
    const {register} = useFormContext();

    const uniqueOptions = Array.from(
        new Map([...options].reverse().map(item => [item.value, item])).values()
    ).reverse();

    return (
        <label className={"label flex flex-col font-bold text-primary-500 mb-3 min-w-2xs"}>
            {label}
            <select {...register(name)} className={"input min-h-[2.5rem] pe-5 bg-surface-50-950 text-surface-950-50" +
                " cursor-pointer font-normal base-font-size"}>
                {uniqueOptions.map((option) => (
                    <option className={"cursor-pointer"}
                            key={option.value} value={option.value} defaultValue={option.selectedValue} selected={option.selectedValue == option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};

export default DropdownField;