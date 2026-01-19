import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import Table from "../../../shared/components/Table.tsx";
import {useUserInfoList} from "../../../features/userInfo/hooks/useUserInfoList.ts";

const tableHeaders = [
    {key: "username", label: "Username"},
    {key: "firstName", label: "First name"},
    {key: "lastName", label: "Last name"}
] as const;

const UserInfoList = () => {
    const {users, loading, navigateToUser} = useUserInfoList();

    return (
        <div className={"content"}>
            <ContentHeader title={"Users"} navTarget={"/admin/users/new"} btnLabel={"New user"}
                           state={{state: {user: {id: "new"}}}}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <Table headers={tableHeaders} data={users}
                           onRowClick={(user) => navigateToUser(user)}></Table>
                )}
            </ContentBody>
        </div>
    );
};

export default UserInfoList;