import {redirect, type RouteObject} from "react-router-dom";
import TableauLayout from "./pages/tableau/TableauLayout.tsx";
import PrivateLayout from "./PrivateLayout.tsx";
import TableauList from "./pages/tableau/list/TableauList.tsx";
import TableauDetail from "./pages/tableau/detail/TableauDetail.tsx";
import RadioShowLayout from "./pages/radioShow/RadioShowLayout.tsx";
import RadioShowList from "./pages/radioShow/list/RadioShowList.tsx";
import RadioShowDetail from "./pages/radioShow/detail/RadioShowDetail.tsx";
import RadioHostLayout from "./pages/radioHost/RadioHostLayout.tsx";
import RadioHostList from "./pages/radioHost/list/RadioHostList.tsx";
import RadioHostDetail from "./pages/radioHost/detail/RadioHostDetail.tsx";
import StudioLayout from "./pages/studio/StudioLayout.tsx";
import StudioList from "./pages/studio/list/StudioList.tsx";
import StudioDetail from "./pages/studio/detail/StudioDetail.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import UserInfo from "./pages/userInfo/UserInfo.tsx";

export const privateRoutes: RouteObject = {
    path: "/admin",
    loader: async () => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            throw redirect("/login");
        }
        return null;
    },
    Component: PrivateLayout,
    children: [
        {path: "dashboard", index: true, Component: Dashboard}, {
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
            path: "settings", Component: UserInfo
        }
    ]
}
