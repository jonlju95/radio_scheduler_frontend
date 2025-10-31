import {type FieldValues, type Path, useFormContext} from "react-hook-form";
import type {InputHTMLAttributes} from "react";

type InputFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    type?: string;
    required?: boolean | string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = <T extends FieldValues>({name, label, type = "text", required, ...props}: InputFieldProps<T>) => {
    const {register, formState: {errors}} = useFormContext();
    const error = errors[name]?.message as string | undefined;

    return (
        <><label htmlFor={name} className={"label flex flex-col font-bold text-primary-500 mb-3"}>
            {label}{required && '*'}
            <input id={name}
                   type={type}
                   {...register(name, {required})} {...props}
                   className={`input h-[2.5rem] bg-surface-50-950 text-surface-950-50 font-normal base-font-size ${error ? 'border-error-500' : ''}`}/>
        </label>
            {error && <p className={"text-error-500"}>{error}</p>}</>
    );
};

export default InputField;