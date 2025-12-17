import {Outlet} from "react-router-dom";

const UserInfoLayout = () => {
    return (
        <section className={"container h-100 min-h-[calc(100vh-8rem)]"}>
            <Outlet/>
        </section>
    );
};

export default UserInfoLayout;