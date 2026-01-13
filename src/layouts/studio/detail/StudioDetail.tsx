import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import CreateStudioForm from "../../../features/studio/components/CreateStudioForm.tsx";
import {useStudio} from "../../../features/studio/hooks/useStudio.ts";

const StudioDetail = () => {
    const {studio, loading, isNew, saveStudio, updateStudio} = useStudio();

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New studio" : studio?.name}`}
                           detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <CreateStudioForm studio={studio}
                                      onSubmit={isNew ? saveStudio : updateStudio}/>
                )}
            </ContentBody>
        </div>
    );
};

export default StudioDetail;