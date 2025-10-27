import {Outlet} from "react-router-dom";

const RadioShowLayout = () => {
    return (
        <section className={"content"}>
            <Outlet/>
        </section>
    );
};

export default RadioShowLayout;