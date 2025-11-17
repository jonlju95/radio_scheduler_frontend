import TableauCarousel from "../../../components/public/TableauCarousel.tsx";
import NowPlayingContainer from "../../../components/public/NowPlayingContainer.tsx";
import Footer from "../../../components/public/Footer.tsx";

const Tableau = () => {
    return (
        <>
            <TableauCarousel/>
            <section className={"col-span-full px-32 flex flex-col items-center min-h-[calc(100vh-4rem)]" +
                " bg-surface-200-800 pt-40 pb-24"}>
                <div className={"grid grid-cols-2 gap-x-4 w-full h-full"}>
                    <div className={"flex p-6 h-full bg-surface-100-900 rounded-xl shadow-md"}>
                        <h3>News</h3>
                    </div>
                    <div className={"flex flex-col"}>
                        <NowPlayingContainer title={"Music"}
                                             description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar. Varius mi posuere leo convallis lobortis arcu tristique ac in."}
                                             imageSrc={"src/assets/image 1.webp"}
                                             imageAlt={"Podcast image"}/>
                        <div className={"flex p-6 h-full bg-surface-100-900 rounded-xl shadow-md"}>
                            <p>Two col</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Tableau;