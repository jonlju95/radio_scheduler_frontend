import {Outlet} from "react-router-dom";

const TableauLayout = () => {
    return (
        <section>
            <div className="headerContainer">
                <h1>Tableau</h1>
            </div>
            <div className="mainContainer">
                <Outlet/>
            </div>
        </section>
    )
}

export default TableauLayout;