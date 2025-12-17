import {type DefaultValues, type FieldValues, FormProvider, useForm, type UseFormReturn} from "react-hook-form";
import Button from "./button/Button.tsx";
import {type ReactNode} from "react";

type FormWrapperProps<T extends FieldValues> = {
    defaultValues?: Partial<T>;
    onSubmit: (data: T) => void | Promise<void>;
    children: ReactNode;
    submitButtonText?: string;
}

const FormWrapper = <T extends FieldValues>({defaultValues, onSubmit, children, submitButtonText = "Submit"}: FormWrapperProps<T>) => {
    const methods = useForm<T>({
        defaultValues: defaultValues as DefaultValues<T>,
        mode: "onChange",
        criteriaMode: "all"
    }) as unknown as UseFormReturn<T>;

    const {
        handleSubmit,
        formState: { isDirty, isValid },
    } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col justify-between h-full"}>
                {children}
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