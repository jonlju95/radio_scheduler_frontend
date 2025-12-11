import FormWrapper from "../../../components/shared/FormWrapper.tsx";
import InputField from "../../../components/shared/InputField.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../contexts/auth/UseAuth.tsx";
import {apiClient} from "../../../api/apiClient.ts";
import type {LoginRequest} from "../../../models/auth/LoginRequest.ts";
import type {User} from "../../../models/auth/User.ts";

interface LoginResponse {
    token: string;
    user: User;
}

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (data: LoginRequest) => {
        apiClient.post<LoginResponse>("/auth/login", data).then(async (r) => {
            login(r.data);
            navigate("/admin/dashboard");
        })
    }

    return (
        <div className={"flex flex-col col-span-4 bg-surface-100-900 aspect-[4/5] rounded-xl" +
            " shadow-md p-8 mt-32 ms-32"}>
            <h3 className={"mb-8 text-primary-700-300"}>RadioFM Login</h3>
            <FormWrapper<LoginRequest> onSubmit={handleLogin}>
                <InputField name={"username"} label={"Username"}/>
                <InputField name={"password"} label={"Password"} type={"password"}/>
            </FormWrapper>
        </div>
    );
};

export default Login;