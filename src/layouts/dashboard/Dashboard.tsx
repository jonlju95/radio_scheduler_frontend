import ContentBody from "../../shared/components/ContentBody.tsx";
import ContentHeader from "../../shared/components/ContentHeader.tsx";


const Dashboard = () => {
    return (
        <section className={"content"}>
            <ContentHeader title={`Dashboard`}/>
            <ContentBody>
                <div className={"grid grid-cols-12 grid-rows-none gap-4 w-full h-full"}>
                    <div className={"col-span-4 bg-secondary-300-700 rounded-xl p-4 h-48"}>
                        <p>Dashboard content</p>
                    </div>
                    <div className={"col-span-4 bg-secondary-300-700 rounded-xl p-4 h-48"}>
                        <p>Dashboard content</p>
                    </div>
                    <div className={"col-span-4 bg-secondary-300-700 rounded-xl p-4 h-48"}>
                        <p>Dashboard content</p>
                    </div>
                    <div className={"col-span-8 bg-secondary-300-700 rounded-xl p-4 h-120"}>
                        <p>Bar chart container</p>
                    </div>
                    <div className={"col-span-4 bg-secondary-300-700 rounded-xl p-4"}>
                        <p>Dashboard content</p>
                    </div>
                </div>
            </ContentBody>
        </section>
    );
};

export default Dashboard;