import PublicLayout from "./PublicLayout.tsx";
import type {RouteObject} from "react-router-dom";
import Login from "./pages/login/Login.tsx";
import Home from "./pages/home/Home.tsx";
import Tableau from "./pages/tableau/Tableau.tsx";

export const publicRoutes: RouteObject =
    {
        path: "/",
        Component: PublicLayout,
        children: [
            {index: true, Component: Home},
            {path: "login", Component: Login},
            {path: "tableau", Component: Tableau},
        ]
    }
