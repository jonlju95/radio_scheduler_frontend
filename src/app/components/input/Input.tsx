import './Input.css';
import * as React from "react";

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
        <label>
            {inputLabel}{required ? '*' : ""}
            <input type={inputType} name={inputName} value={value ?? ""} onChange={onChange} required={required}/>
        </label>
    );
};

export default Input;