import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import RadioShowForm from "../../../features/radioShow/components/RadioShowForm.tsx";
import {useRadioShowDetail} from "../../../features/radioShow/hooks/useRadioShowDetail.tsx";

const RadioShowDetail = () => {
    const {show, loading, isNew, saveShow, updateShow} = useRadioShowDetail();

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New show" : show?.title}`}
                           detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <RadioShowForm radioShow={show}
                                   onSubmit={isNew ? saveShow : updateShow}/>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioShowDetail;