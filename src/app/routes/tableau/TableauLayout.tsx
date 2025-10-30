import {Outlet} from "react-router-dom";

const TableauLayout = () => {
    return (
        <section className={"container h-100"}>
            <Outlet/>
        </section>
    )
}

export default TableauLayout;