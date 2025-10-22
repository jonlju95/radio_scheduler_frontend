import {Outlet} from "react-router-dom";

const TableauLayout = () => {
    return (
        <div>
            <h1>Tableau</h1>
            <Outlet/>
        </div>
    )
}

export default TableauLayout;