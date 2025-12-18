import {createBrowserRouter} from "react-router-dom";
import {publicRoutes} from "./routes/public.routes.tsx";
import {privateRoutes} from "./routes/private.routes.tsx";

export const router = createBrowserRouter([
    publicRoutes,
    privateRoutes,
    // { path: "*", element: <NotFound/> }
])