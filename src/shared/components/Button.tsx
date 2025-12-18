import {type ButtonHTMLAttributes, type ReactNode} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../utils/mappers/cn.ts";

const buttonVariants = cva(
    ["py-2", "px-4", "rounded-md", "font-medium", "shadow-md"],
    {
        variants: {
            intent: {
                primary: ["bg-primary-800-200", "text-surface-50-950"],
                secondary: ["bg-secondary-950-50", "text-surface-50-950"],
            },
            size: {},
            disabled: {
                false: null,
                true: ["opacity-50", "cursor-default"],
            }
        }, compoundVariants: [
            {
                intent: "primary",
                disabled: false,
                class: ["hover:bg-primary-700-300"]
            }
        ], defaultVariants: {
            intent: "primary",
            disabled: false
        }
    }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    btnLabel?: string | ReactNode;
    btnType?: 'button' | 'submit';
    btnClasses?: string;
    onClickAction?: () => void;
    disabled?: boolean;
}


const Button = ({btnLabel, btnType = "button", btnClasses = '', onClickAction, intent, disabled}: ButtonProps) => {
    return (
        <button className={cn((buttonVariants({intent, disabled})), btnClasses)}
                type={btnType}
                onClick={onClickAction}
                disabled={disabled}>
            {btnLabel}
        </button>
    );
}

export default Button;