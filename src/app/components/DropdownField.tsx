import {useFormContext} from "react-hook-form";

export type Option = {
    label: string;
    value: string;
};

const DropdownField = ({name, label, options}: {
    name: string;
    label: string;
    options: Option[];
}) => {
    const {register} = useFormContext();

    return (
        <label className={"label flex flex-col font-bold text-primary-500 mb-3 min-w-2xs"}>
            {label}
            <select {...register(name)} className={"input min-h-[2.5rem] bg-surface-50-950 text-surface-950-50" +
                " cursor-pointer font-normal base-font-size"}>
                {options.map((option) => (
                    <option className={"cursor-pointer"}
                            key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};

export default DropdownField;