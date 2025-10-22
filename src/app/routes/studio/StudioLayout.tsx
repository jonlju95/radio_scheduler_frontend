import {Outlet} from "react-router-dom";

const StudioLayout = () => {

    return (
        <section>
            <div className="headerContainer">
                <h1>Studios</h1>
            </div>
            <div className="mainContainer">
                <Outlet/>
            </div>
        </section>
    )
}

export default StudioLayout;