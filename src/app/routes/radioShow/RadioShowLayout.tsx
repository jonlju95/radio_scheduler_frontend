import {Outlet} from "react-router-dom";

const RadioShowLayout = () => {
    return (
        <section>
            <div className="headerContainer">
                <h1>Shows</h1>
            </div>
            <div className="mainContainer">
                <Outlet/>
            </div>
        </section>
    );
};

export default RadioShowLayout;