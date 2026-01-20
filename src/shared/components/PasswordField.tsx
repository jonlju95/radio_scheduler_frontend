import {type InputHTMLAttributes, useState} from 'react';
import {type FieldValues, type Path, useFormContext} from "react-hook-form";
import {HiEye} from "react-icons/hi2";
import {HiEyeOff} from "react-icons/hi";

type InputFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    required?: boolean | string;
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordField = <T extends FieldValues>({name, label, required, ...props}: InputFieldProps<T>) => {
    const {register, formState: {errors}} = useFormContext();
    const error = errors[name]?.message as string | undefined;
    const [type, setType] = useState<string>("password");

    const toggleVisibility = () => {
        if (type === "password") {
            setType("text");
        } else {
            setType("password");
        }
    }

    return (
        <><label htmlFor={name} className={"label flex flex-col font-bold text-primary-800-200 mb-3 relative"}>
            {label}{required && '*'}
            <input id={name}
                   type={type}
                   {...register(name, {required})} {...props}
                   className={`input h-10 bg-surface-50-950 text-surface-950-50 font-normal base-font-size ${error ? 'border-error-500' : ''}`}/>
            <span onClick={toggleVisibility} className={"absolute bottom-3 right-4 cursor-pointer"}>
                {type === "password" ? <HiEye/> : <HiEyeOff/>}
            </span>
        </label>
            {error && <p className={"text-error-500"}>{error}</p>}
        </>
);
};

export default PasswordField;