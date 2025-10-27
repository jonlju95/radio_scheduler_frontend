import './ToggleInput.css';
import * as React from "react";

interface InputProps {
    inputLabel: string,
    inputName: string,
    checked: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean | undefined,
}

const ToggleInput: React.FC<InputProps> = ({
    inputLabel,
    inputName,
    checked = false,
    onChange
}) => {


    return (
        <>
            <span className={"switchLabel"}>{inputLabel}</span>
            <label className={"switch"}>
                <input type={"checkbox"} name={inputName} checked={checked} onChange={onChange}/>
                <span className={"slider round"}></span>
            </label></>
    );
};

export default ToggleInput;