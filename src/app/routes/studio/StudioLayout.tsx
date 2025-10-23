import "./StudioLayout.css";
import {Outlet} from "react-router-dom";

const StudioLayout = () => {

    return (
        <section className={"content"}>
            <Outlet/>
        </section>
    )
}

export default StudioLayout;