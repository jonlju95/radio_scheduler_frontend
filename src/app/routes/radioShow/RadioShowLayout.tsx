import {Outlet} from "react-router-dom";

const RadioShowLayout = () => {
    return (
        <section className={"container h-full min-h-[calc(100vh-8rem)]"}>
            <Outlet/>
        </section>
    );
};

export default RadioShowLayout;