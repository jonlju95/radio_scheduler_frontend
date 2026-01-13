import Table from "../../../shared/components/Table.tsx";
import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import {useStudioList} from "../../../features/studio/hooks/useStudioList.ts";

const tableHeaders = [
    {key: "id", label: "Id"},
    {key: "name", label: "Name"},
    {key: "bookingPrice", label: "Booking price"},
    {key: "capacity", label: "Capacity"},
] as const;

const StudioList = () => {
    const { studios, loading, navigateToStudio } = useStudioList();

    return (
        <div className={"content"}>
            <ContentHeader title={"Studios"} navTarget={"/admin/studios/new"} btnLabel={"New studio"} state={{state: {studio: {id: "new"}}}}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <Table headers={tableHeaders} data={studios}
                           onRowClick={(studio) => navigateToStudio(studio)}></Table>
                )}
            </ContentBody>
        </div>
    );
}

export default StudioList;
