import PublicLayout from "../layouts/PublicLayout.tsx";
import type {RouteObject} from "react-router-dom";
import Login from "../layouts/login/Login.tsx";
import Home from "../layouts/home/Home.tsx";
import DailyTableau from "../layouts/dailyTableau/DailyTableau.tsx";

export const publicRoutes: RouteObject =
    {
        path: "/",
        Component: PublicLayout,
        children: [
            {index: true, Component: Home},
            {path: "login", Component: Login},
            {path: "tableau", Component: DailyTableau},
        ]
    }
