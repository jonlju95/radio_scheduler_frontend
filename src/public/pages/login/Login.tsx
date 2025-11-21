import FormWrapper from "../../../components/shared/FormWrapper.tsx";
import InputField from "../../../components/shared/InputField.tsx";
import {useNavigate} from "react-router-dom";
import {mockAuth} from "../../../auth/mockSessions.ts";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Login");
        mockAuth.login("Admin", "admin");
        navigate("/admin/dashboard");
    }

    return (
        <div className={"flex flex-col col-span-4 bg-surface-100-900 aspect-[4/5] rounded-xl" +
            " shadow-md p-8 mt-32 ms-32"}>
            <h3 className={"mb-8 text-primary-700-300"}>RadioFM Login</h3>
            <FormWrapper onSubmit={handleLogin}>
                <InputField name={"username"} label={"Username"} disabled={true}/>
                <InputField name={"password"} label={"Password"} type={"password"} disabled={true}/>
            </FormWrapper>
        </div>
    );
};

export default Login;