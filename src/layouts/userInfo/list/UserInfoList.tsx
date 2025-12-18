import type {User} from "../../../features/auth/models/User.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiClient} from "../../../api/apiClient.ts";
import ContentHeader from "../../../shared/components/ContentHeader.tsx";
import ContentBody from "../../../shared/components/ContentBody.tsx";
import Table from "../../../shared/components/Table.tsx";

const tableHeaders = [
    {key: "username", label: "Username" },
    {key: "firstName", label: "First name" },
    {key: "lastName", label: "Last name" }
] as const;

const UserInfoList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = () => {
            apiClient.get<User[]>("/users")
                .then(response => {
                    setUsers(response.data);
                    setLoading(false);
                })
        }
        getUsers();
    }, []);

    return (
        <div className={"content"}>
            <ContentHeader title={"Users"} navTarget={"/admin/users/new"} btnLabel={"New user"}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <Table headers={tableHeaders} data={users}
                           onRowClick={(row) => navigate(`/admin/users/${row.id}`, {state: {row}})}></Table>
                )}
            </ContentBody>
        </div>
    );
};

export default UserInfoList;