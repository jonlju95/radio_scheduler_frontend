import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import StudioForm from "../../../features/studio/components/StudioForm.tsx";
import {useStudioDetail} from "../../../features/studio/hooks/useStudioDetail.ts";

const StudioDetail = () => {
    const {studio, loading, isNew, saveStudio, updateStudio} = useStudioDetail();

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New studio" : studio?.name}`}
                           detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <StudioForm studio={studio}
                                onSubmit={isNew ? saveStudio : updateStudio}/>
                )}
            </ContentBody>
        </div>
    );
};

export default StudioDetail;