import {Outlet} from "react-router-dom";

const TableauLayout = () => {
    return (
        <section className={"content"}>
            <Outlet/>
        </section>
    )
}

export default TableauLayout;