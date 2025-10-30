import {Outlet} from "react-router-dom";

const RadioHostLayout = () => {
    return (
        <section className={"container h-full"}>
            <Outlet/>
        </section>
    );
};

export default RadioHostLayout;