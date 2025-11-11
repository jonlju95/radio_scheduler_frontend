import {createBrowserRouter} from "react-router-dom";
import {publicRoutes} from "./public/routes.tsx";
import {privateRoutes} from "./private/routes.tsx";

export const router = createBrowserRouter([
    publicRoutes,
    privateRoutes,
    // { path: "*", element: <NotFound/> }
])