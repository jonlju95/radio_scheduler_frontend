import {Outlet} from "react-router-dom";

const StudioLayout = () => {

    return (
        <section className={"container h-full"}>
            <Outlet/>
        </section>
    )
}

export default StudioLayout;