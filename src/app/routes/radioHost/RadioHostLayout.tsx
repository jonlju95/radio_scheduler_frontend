import {Outlet} from "react-router-dom";

const RadioHostLayout = () => {
    return (
        <section>
            <div className="headerContainer">
                <h1>Hosts</h1>
            </div>
            <div className="mainContainer">
                <Outlet/>
            </div>
        </section>
    );
};

export default RadioHostLayout;