import React from "react";

export type Option = {
    label: string;
    value: string;
};

interface DropdownProps {
    dropdownName: string;
    dropdownLabel: string;
    options: Option[];
    onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({dropdownName, dropdownLabel, options, onChange}) => {
    return (
        <label className={"label flex flex-col font-bold text-primary-500 mb-3 min-w-2xs"}>
            {dropdownLabel}
            <select name={dropdownName} className={"input min-h-[2.5rem] bg-surface-50-950 text-surface-950-50" +
                " cursor-pointer" +
                " font-normal base-font-size"}
                    onChange={(e) => onChange?.(e.target.value)}>
                {options.map((option, index) => (
                    <option className={"cursor-pointer"}
                        key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};

export default Dropdown;