import {type DefaultValues, type FieldValues, FormProvider, useForm} from "react-hook-form";
import Button from "./Button.tsx";
import {type ReactNode} from "react";

type FormWrapperProps<T extends FieldValues> = {
    defaultValues?: DefaultValues<T>;
    onSubmit: (data: T) => void | Promise<void>;
    children: ReactNode;
    submitButtonText?: string;
}

const FormWrapper = <T extends FieldValues>({
    defaultValues,
    onSubmit,
    children,
    submitButtonText = "Submit"
}: FormWrapperProps<T>) => {
    const methods = useForm<T>({
        defaultValues: defaultValues as DefaultValues<T>,
        mode: "onChange",
        criteriaMode: "all"
    });

    const {
        handleSubmit,
        formState: {isDirty, isValid},
    } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col justify-between w-full h-full"}>
                <div className={"flex flex-col gap-y-6 h-full"}>
                    {children}
                </div>
                <div className={"flex justify-end"}>
                    <Button disabled={!isDirty || !isValid}
                            btnLabel={submitButtonText} btnType={"submit"}
                            btnClasses={"btn-primary"}/>
                </div>
            </form>
        </FormProvider>
    );
};

export default FormWrapper;