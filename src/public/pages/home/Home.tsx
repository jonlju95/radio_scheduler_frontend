import Button from "../../../components/button/Button.tsx";
import PodcastItem from "../../../components/PodcastItem.tsx";
import NewsItem from "../../../components/NewsItem.tsx";
import Footer from "../../../components/Footer.tsx";

const Home = () => {
    return (
        <>
            <section className={"col-span-full flex items-center min-h-[calc(100vh-4rem)] px-32 mt-16 bg-cover" +
                " bg-center relative"}
                     style={{backgroundImage: "url('/src/assets/heroSectionBg.webp')"}}>
                <div className={"flex flex-col col-span-6 z-50 text-surface-50"}>
                    <div className={"mb-6"}>
                        <h1>RadioFM</h1>
                        <h4>The place for <span className={"underline"}>your</span> listening needs</h4>
                    </div>
                    <div className={"mb-6"}>
                        <p>Lorem ipsum dolor sit amet consectetur. Placerat semper facilisi quisque posuere iaculis
                            cursus amet ornare feugiat.</p>
                    </div>
                    <div>
                        <Button btnClasses={"btn-primary text-surface-50"} btnLabel={"Learn more"}/>
                    </div>
                </div>
                <div
                    className={"flex justify-between items-center bg-primary-900-100 text-primary-50-950 rounded-r-xl" +
                        " h-48 w-2/3 px-32 absolute left-0 top-[calc(100vh-10rem)]"}>
                    <div>
                        <h2>15M</h2>
                        <p>Current subscribers</p>
                    </div>
                    <div>
                        <h2>200+</h2>
                        <p>Podcast episodes</p>
                    </div>
                    <div>
                        <h2>134K</h2>
                        <p>Followers</p>
                    </div>
                </div>
            </section>
            <section className={"col-span-full px-32 flex flex-col items-center min-h-[calc(100vh-4rem)]" +
                " bg-surface-200-800 pt-40"}>
                <h2 className={"mb-6"}>Most played this month</h2>
                <div className={"grid grid-cols-3 gap-x-4"}>
                    <PodcastItem title={"Lorem ipsum"}
                                 description={"Lorem ipsum dolor sit amet consectetur. Elit sollicitudin convallis feugiat sagittis gravida integer a eget. Magna aliquam nisl mauris orci in."}
                    imageSrc={"src/assets/image 4.webp"}
                    imageAlt={"Podcast image"}/>
                    <PodcastItem title={"Lorem ipsum"}
                                 description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar. Varius mi posuere leo convallis lobortis arcu tristique ac in."}
                    imageSrc={"src/assets/image 1.webp"}
                    imageAlt={"Podcast image"}/>
                    <PodcastItem title={"Lorem ipsum"}
                                 description={"Lorem ipsum dolor sit amet consectetur. Ut est suscipit integer aliquam faucibus amet sagittis dictum. Ornare id tellus nulla lectus orci in feugiat iaculis."}
                    imageSrc={"src/assets/image 3.webp"}
                    imageAlt={"Podcast image"}/>
                </div>
            </section>
            <section className={"col-span-full px-32 flex flex-col min-h-[calc(100vh-4rem)]" +
                " bg-surface-300-700 pt-16"}>
                <h2 className={"mb-6"}>News</h2>
                <div className={"flex flex-col"}>
                    <NewsItem title={"Lorem ipsum"}
                                 description={"Lorem ipsum dolor sit amet consectetur. Elit sollicitudin convallis feugiat sagittis gravida integer a eget. Magna aliquam nisl mauris orci in."}
                    imageSrc={"src/assets/image 4.webp"}
                    imageAlt={"Podcast image"}/>
                    <NewsItem title={"Lorem ipsum"}
                                 description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar. Varius mi posuere leo convallis lobortis arcu tristique ac in."}
                    imageSrc={"src/assets/image 1.webp"}
                    imageAlt={"Podcast image"}/>
                    <NewsItem title={"Lorem ipsum"}
                                 description={"Lorem ipsum dolor sit amet consectetur. Ut est suscipit integer aliquam faucibus amet sagittis dictum. Ornare id tellus nulla lectus orci in feugiat iaculis."}
                    imageSrc={"src/assets/image 3.webp"}
                    imageAlt={"Podcast image"}/>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;