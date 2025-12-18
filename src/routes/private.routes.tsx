import {redirect, type RouteObject} from "react-router-dom";
import TableauLayout from "../layouts/tableau/TableauLayout.tsx";
import PrivateLayout from "../layouts/PrivateLayout.tsx";
import TableauList from "../layouts/tableau/list/TableauList.tsx";
import TableauDetail from "../layouts/tableau/detail/TableauDetail.tsx";
import RadioShowLayout from "../layouts/radioShow/RadioShowLayout.tsx";
import RadioShowList from "../layouts/radioShow/list/RadioShowList.tsx";
import RadioShowDetail from "../layouts/radioShow/detail/RadioShowDetail.tsx";
import RadioHostLayout from "../layouts/radioHost/RadioHostLayout.tsx";
import RadioHostList from "../layouts/radioHost/list/RadioHostList.tsx";
import RadioHostDetail from "../layouts/radioHost/detail/RadioHostDetail.tsx";
import StudioLayout from "../layouts/studio/StudioLayout.tsx";
import StudioList from "../layouts/studio/list/StudioList.tsx";
import StudioDetail from "../layouts/studio/detail/StudioDetail.tsx";
import UserInfoDetail from "../layouts/userInfo/detail/UserInfoDetail.tsx";
import UserInfoLayout from "../layouts/userInfo/UserInfoLayout.tsx";
import UserInfoList from "../layouts/userInfo/list/UserInfoList.tsx";
import type {User} from "../features/auth/models/User.ts";
import Dashboard from "../layouts/dashboard/Dashboard.tsx";

const ADMIN_ROLE_ID = "6ef3637a-ce29-4816-81a6-fa667743b362";

const authLoader = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        throw redirect("/login");
    }
    return null;
}

const adminLoader = async () => {
    const user: User | null = JSON.parse(localStorage.getItem("authUser") ?? "null");
    if (!user) {
        throw redirect("/login");
    }

    const isAdmin = user.roles.some(r => r.id === ADMIN_ROLE_ID);
    if (!isAdmin) {
        throw redirect(`/admin/users/${user.id}`);
    }

    return null;
};

export const privateRoutes: RouteObject = {
    path: "/admin",
    loader: authLoader,
    Component: PrivateLayout,
    children: [
        {path: "dashboard", index: true, Component: Dashboard},
        {path: "users/:id", Component: UserInfoDetail},

        {
            loader: adminLoader,
            children: [{
                path: "tableau", Component: TableauLayout, children: [
                    {index: true, Component: TableauList},
                    {path: ":id", Component: TableauDetail},
                ]
            }, {
                path: "timeslots"
            }, {
                path: "shows", Component: RadioShowLayout, children: [
                    {index: true, Component: RadioShowList},
                    {path: ":id", Component: RadioShowDetail},
                ]
            }, {
                path: "hosts", Component: RadioHostLayout, children: [
                    {index: true, Component: RadioHostList},
                    {path: ":id", Component: RadioHostDetail},
                ]
            }, {
                path: "studios", Component: StudioLayout, children: [
                    {index: true, Component: StudioList},
                    {path: ":id", Component: StudioDetail},
                ]
            }, {
                path: "users", Component: UserInfoLayout,
                children: [
                    {index: true, Component: UserInfoList},
                    {path: ":id", Component: UserInfoDetail},
                ]
            }]
        }
    ]
}
