import FormWrapper from "../../shared/components/FormWrapper.tsx";
import InputField from "../../shared/components/InputField.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../shared/hooks/useAuth.ts";
import {apiClient} from "../../api/apiClient.ts";
import type {LoginRequest} from "../../features/auth/models/LoginRequest.ts";
import type {User} from "../../features/auth/models/User.ts";

interface LoginResponse {
    token: string;
    user: User;
}

const Login = () => {
    const {login} = useAuth();
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
                <div>
                    <InputField name={"username"} label={"Username"}/>
                    <InputField name={"password"} label={"Password"} type={"password"}/>
                    <div className={"bg-primary-50-950 rounded-xl p-6 mt-12"}>
                        <p className={"flex flex-col"}>
                            <span className={"font-bold"}>For testing purposes:</span>
                            <span>Use username admin for admin and user for contributor login.
                                Password for both is YourPassword123!</span>
                        </p>
                    </div>
                </div>
            </FormWrapper>

        </div>
    );
};

export default Login;