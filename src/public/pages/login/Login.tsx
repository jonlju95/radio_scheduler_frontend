import FormWrapper from "../../../components/FormWrapper.tsx";
import InputField from "../../../components/InputField.tsx";


const Login = () => {
    const tryLogin = () => {

    }

    return (
        <div className={"flex flex-col col-span-4 bg-surface-100-900 aspect-[4/5] rounded-xl" +
            " shadow-md p-8 mt-32 ms-32"}>
            <h3 className={"mb-8 text-primary-700-300"}>RadioFM Login</h3>
            <FormWrapper onSubmit={tryLogin}>
                <InputField name={"username"} label={"Username"}/>
                <InputField name={"password"} label={"Password"}/>
            </FormWrapper>
        </div>
    );
};

export default Login;