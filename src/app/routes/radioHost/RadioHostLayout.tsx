import {Outlet} from "react-router-dom";

const RadioHostLayout = () => {
    return (
        <section className={"content"}>
            <Outlet/>
        </section>
    );
};

export default RadioHostLayout;