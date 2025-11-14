import {useLocation} from "react-router-dom";
import type {RadioHost} from "../../../../models/RadioHost.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";
import InputField from "../../../../components/shared/InputField.tsx";
import ToggleField from "../../../../components/shared/ToggleField.tsx";
import ContentHeader from "../../../../components/private/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../../components/private/contentBody/ContentBody.tsx";
import {useDialog} from "../../../../contexts/dialog/UseDialog.tsx";
import FormWrapper from "../../../../components/shared/FormWrapper.tsx";

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

    const saveHost = (data: RadioHost) => {
        const updatedHost = {
            ...data,
            id: !isNew ? host.id : undefined,
        }

        if (!isNew) {
            const hasChanged = Object.keys(updatedHost).some(
                (key) => (updatedHost as never)[key] !== (originalHost as never)[key]
            );

            if (!hasChanged) {
                triggerDialog({
                    title: "Warning",
                    message: "No changes detected",
                    variant: "warning",
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
                    variant: "success",
                });
            });
        } else {
            apiClient.put<RadioHost>(`/radioHosts/${host.id}`, updatedHost).then(r => {
                setHost(r.data);
                setOriginalHost(r.data);
                triggerDialog({
                    title: "Success",
                    message: "Host updated",
                    variant: "success",
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
                    <FormWrapper defaultValues={host} onSubmit={saveHost}>
                        <InputField name={"firstName"} label={"First name"}/>
                        <InputField name={"lastName"} label={"Last name"}/>
                        <ToggleField checked={host.isGuest} round={true} name={"isGuest"} label={"Is guest"}/>
                    </FormWrapper>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioHostDetail;