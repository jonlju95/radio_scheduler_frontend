import Table from "../../../shared/components/Table.tsx";
import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import {useRadioHostList} from "../../../features/radioHost/hooks/useRadioHostList.ts";

const tableHeaders = [
    {key: "id", label: "Id"},
    {key: "firstName", label: "First name"},
    {key: "lastName", label: "Last name"},
    {key: "isGuest", label: "Guest"}
] as const;

const RadioHostList = () => {
    const {hosts, loading, navigateToHost} = useRadioHostList();

    return (
        <div className={"content"}>
            <ContentHeader title={"Hosts"} navTarget={"/admin/hosts/new"} btnLabel={"New host"}
                           state={{state: {radioHost: {id: "new"}}}}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <Table headers={tableHeaders} data={hosts}
                           onRowClick={(radioHost) => navigateToHost(radioHost)}></Table>
                )}
            </ContentBody>
        </div>
    );
};

export default RadioHostList;