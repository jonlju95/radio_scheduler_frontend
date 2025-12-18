import {useFormContext} from "react-hook-form";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../utils/mappers/cn.ts";

const toggleVariants = cva(
    "absolute inset-0 cursor-pointer transition-[0.4s] bg-surface-50-950 " +
    "before:absolute before:h-6 before:w-6 before:left-[4px] before:bottom-[calc(2rem-1.8rem)] " +
    "before:bg-surface-100-900 before:transition-[0.4s]",
    {
        variants: {
            checked: {
                false: "border border-surface-200-800",
                true: "border-transparent",
            },
            round: {
                false: "rounded-md",
                true: "rounded-4xl before:rounded-4xl",
            }
        }, defaultVariants: {
            checked: false,
            round: false
        }
    }
)

interface ToggleProps extends VariantProps<typeof toggleVariants> {
    name: string;
    label: string;
}

const ToggleField = ({name, label, checked, round}: ToggleProps) => {
    const {register} = useFormContext();

    return (
        <div className={"flex flex-col mb-4"}>
            <span className={"font-bold base-font-size text-primary-800-200 mb-1"}>
                {label}
            </span>

            <label className={"relative inline-block w-16 h-8"}>
                <input className={"peer hidden"} type={"checkbox"} {...register(name)}/>

                <span className={cn((toggleVariants({checked, round})),
                    "peer-checked:bg-primary-300-700", "peer-checked:border-transparent", "peer-checked:before:translate-x-[calc(2rem-1px)]")}/>
            </label>
        </div>
    );
};

export default ToggleField;
