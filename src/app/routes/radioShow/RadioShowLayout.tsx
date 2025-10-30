import {Outlet} from "react-router-dom";

const RadioShowLayout = () => {
    return (
        <section className={"container h-full"}>
            <Outlet/>
        </section>
    );
};

export default RadioShowLayout;