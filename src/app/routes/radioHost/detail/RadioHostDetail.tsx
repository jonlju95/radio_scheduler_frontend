import {useLocation} from "react-router-dom";
import type {RadioHost} from "../../../../models/RadioHost.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";
import InputField from "../../../components/InputField.tsx";
import ToggleField from "../../../components/ToggleField.tsx";
import ContentHeader from "../../../components/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../components/contentBody/ContentBody.tsx";
import Button from "../../../components/button/Button.tsx";
import {useDialog} from "../../../../contexts/UseDialog.tsx";

const RadioHostDetail = () => {
    const {state} = useLocation();
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

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New host" : (host?.firstName + " " + host?.lastName)}`}
                           detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <form onSubmit={e => {
                        e.preventDefault();
                        saveHost(new FormData(e.currentTarget))
                    }}>
                        <div>
                            <InputField inputLabel={"First name"} inputType={"text"} inputName={"firstName"}
                                        value={host?.firstName}
                                        onChange={(e) => {
                                       setHost({...host, firstName: e.target.value})
                                   }} required/>
                            <InputField inputLabel={"Last name"} inputType={"text"} inputName={"lastName"}
                                        value={host?.lastName}
                                        onChange={(e) => {
                                       setHost({...host, lastName: e.target.value})
                                   }} required/>
                            <ToggleField inputLabel={"Is guest"} inputName={"isGuest"}
                                         checked={host?.isGuest}
                                         onChange={(e) => {
                                             setHost({...host, isGuest: e.target.checked})
                                         }}/>
                        </div>
                        <Button btnLabel={"Submit"} btnType="submit" btnClasses={["btn-primary"]}/>
                    </form>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioHostDetail;