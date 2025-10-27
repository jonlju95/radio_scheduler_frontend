import {useLocation, useNavigate} from "react-router-dom";
import type {RadioHost} from "../../../../models/RadioHost.ts";
import {useEffect, useState} from "react";
import {useDialog} from "../../../../contexts/DialogContext.tsx";
import {apiClient} from "../../../../api/apiClient.ts";
import Input from "../../../components/input/Input.tsx";
import ToggleInput from "../../../components/toggleInput/ToggleInput.tsx";

const RadioHostDetail = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const isNew = state.row.id === "new";

    const emptyHost: RadioHost = {
        id: "new",
        firstName: "",
        lastName: "",
        isGuest: false,
    };

    const [host, setHost] = useState<RadioHost>(isNew ? emptyHost : state.row);
    const [originalHost, setOriginalHost] = useState<RadioHost>(isNew ? emptyHost : state.row);
    const [loading, setLoading] = useState(!isNew);

    const {triggerDialog} = useDialog();

    useEffect(() => {
        if (!isNew) {
            apiClient.get<RadioHost>(`/radioHosts/${host.id}`)
                .then(response => {
                    setHost(response.data);
                    setOriginalHost(response.data);
                    setLoading(false);
                });
        }
    }, [isNew, host.id]);

    const saveHost = (formData: FormData) => {
        const updatedHost = {
            id: !isNew ? host.id : undefined,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            isGuest: formData.get("isGuest") === "on",
        }

        if (!isNew) {
            const hasChanged = Object.keys(updatedHost).some(
                (key) => (updatedHost as never)[key] !== (originalHost as never)[key]
            );

            if (!hasChanged) {
                triggerDialog({
                    title: "Warning",
                    message: "No changes detected",
                    classes: "warning",
                });
                return;
            }
        }

        if (isNew) {
            apiClient.post<RadioHost>(`/radioHosts`, updatedHost).then(r => {
                setHost(r.data);
                setOriginalHost(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Host created",
                    classes: "success",
                });
            });
        } else {
            apiClient.put<RadioHost>(`/radioHosts/${host.id}`, updatedHost).then(r => {
                setHost(r.data);
                setOriginalHost(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Host updated",
                    classes: "success",
                });
            });
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"container"}>
            <div className="headerContainer">
                <div className={"detailHeader"}>
                    <svg
                        onClick={() => navigate(-1)}
                        viewBox="-4 -4 32 32"
                        id="chevron"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 6.1428817,1.0000087 17.857157,12 6.1428817,22.999991"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            id="path1"/>
                    </svg>
                    <h3>{isNew ? "New host" : host?.firstName + " " + host?.lastName}</h3></div>
            </div>
            <div className="mainContainer">
                <form onSubmit={e => {
                    e.preventDefault();
                    saveHost(new FormData(e.currentTarget))
                }}>
                    <div>
                        <Input inputLabel={"First name"} inputType={"text"} inputName={"firstName"}
                               value={host?.firstName}
                               onChange={(e) => {
                                   setHost({...host, firstName: e.target.value})
                               }} required/>
                        <Input inputLabel={"Last name"} inputType={"text"} inputName={"lastName"}
                               value={host?.lastName}
                               onChange={(e) => {
                                   setHost({...host, lastName: e.target.value})
                               }} required/>
                        <ToggleInput inputLabel={"Is guest"} inputName={"isGuest"}
                                     checked={host?.isGuest}
                                     onChange={(e) => {
                                         setHost({...host, isGuest: e.target.checked})
                                     }}/>
                    </div>
                    <button type="submit" className={"btn btn-primary"}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RadioHostDetail;