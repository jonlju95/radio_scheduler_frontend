import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import {useRadioShowList} from "../../../features/radioShow/hooks/useRadioShowList.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import Table from "../../../shared/components/Table.tsx";

const tableHeaders = [
    {key: "id", label: "Id"},
    {key: "title", label: "Title"},
    {key: "durationMin", label: "Duration (minutes)"}
] as const;

const RadioShowList = () => {
    const {shows, loading, navigateToShow} = useRadioShowList();

    return (
        <div className={"content"}>
            <ContentHeader title={"Shows"} navTarget={"/admin/shows/new"} btnLabel={"New show"}
                           state={{state: {radioShow: {id: "new"}}}}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <Table headers={tableHeaders} data={shows}
                           onRowClick={(radioShow) => navigateToShow(radioShow)}></Table>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioShowList;