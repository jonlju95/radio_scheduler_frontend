import {cva} from "class-variance-authority";

export const dialogVariants = cva(
    "w-fit min-w-xs h-fit absolute right-12 bottom-12 p-4 flex rounded-md shadow-md" +
    " hover:cursor-pointer",
    {
        variants: {
            status: {
                success: "bg-success-100-900 border border-success-200-800",
                warning: "bg-warning-100-900 border border-warning-200-800",
                error: "bg-error-100-900 border border-error-200-800",
            }
        },
        defaultVariants: {
            status: "success"
        }
    }
);