import '../../styles/toggleField.css';
import {useFormContext} from "react-hook-form";

const ToggleField = ({name, label}: {
    name: string,
    label: string,
}) => {
    const {register} = useFormContext();

    return (
        <>
            <span className={"switchLabel"}>{label}</span>
            <label className={"switch"}>
                <input type={"checkbox"} {...register(name)}/>
                <span className={"slider round"}></span>
            </label>
        </>
    );
};

export default ToggleField;
