import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import {useRadioHostDetail} from "../../../features/radioHost/hooks/useRadioHostDetail.ts";
import RadioHostForm from "../../../features/radioHost/components/RadioHostForm.tsx";

const RadioHostDetail = () => {
    const {host, loading, isNew, saveHost, updateHost} = useRadioHostDetail();

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New host" : (host?.firstName + " " + host?.lastName)}`}
                           detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <RadioHostForm radioHost={host} onSubmit={isNew ? saveHost : updateHost}/>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioHostDetail;