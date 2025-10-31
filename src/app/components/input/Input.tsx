import React from "react";

interface InputProps {
    inputLabel: string,
    inputType: string,
    inputName: string,
    value: string | number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean | undefined,
}

const Input: React.FC<InputProps> = ({
    inputLabel,
    inputType,
    inputName,
    value,
    onChange,
    required
}) => {

    return (
        <label className={"label flex flex-col font-bold text-primary-500 mb-3"}>
            {inputLabel}{required ? '*' : ""}
            <input className={"input h-[2.5rem] bg-surface-50-950 text-surface-950-50 font-normal base-font-size"}
                type={inputType} name={inputName} value={value ?? ""} onChange={onChange} required={required}/>
        </label>
    );
};

export default Input;