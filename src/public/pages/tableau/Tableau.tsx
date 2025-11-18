import TableauCarousel from "../../../components/public/TableauCarousel.tsx";
import Footer from "../../../components/public/Footer.tsx";
import CardContainer from "../../../components/public/CardContainer.tsx";
import {usePlayerControls} from "../../../contexts/playerControls/UsePlayerControls.tsx";
import TimeslotCard from "../../../components/public/TimeslotCard.tsx";

const Tableau = () => {
    const {showControls} = usePlayerControls();

    return (
        <>
            <section className={"col-span-full px-32 flex flex-col items-center " +
                " bg-surface-200-800 pt-40 pb-24"}>
                <TableauCarousel/>
                <div className={"grid grid-cols-2 gap-x-4 w-full h-fit"}>
                    <div className={"flex flex-col p-6 h-full bg-surface-100-900 rounded-xl shadow-md"}>
                        <h3 className={"mb-3"}>News</h3>
                        <div className={"flex flex-col"}>
                            <CardContainer title={"Lorem ipsum"}
                                           description={"Lorem ipsum dolor sit amet consectetur. Elit sollicitudin convallis feugiat sagittis gravida integer a eget. Magna aliquam nisl mauris orci in."}
                                           imageSrc={"src/assets/image 4.webp"}
                                           imageAlt={"Podcast image"}
                                           showControls={showControls}
                                           layout={"news"}/>
                            <CardContainer title={"Lorem ipsum"}
                                           description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar. Varius mi posuere leo convallis lobortis arcu tristique ac in."}
                                           imageSrc={"src/assets/image 1.webp"}
                                           imageAlt={"Podcast image"}
                                           showControls={showControls}
                                           layout={"news"}/>
                            <CardContainer title={"Lorem ipsum"}
                                           description={"Lorem ipsum dolor sit amet consectetur. Ut est suscipit integer aliquam faucibus amet sagittis dictum. Ornare id tellus nulla lectus orci in feugiat iaculis."}
                                           imageSrc={"src/assets/image 3.webp"}
                                           imageAlt={"Podcast image"}
                                           showControls={showControls}
                                           layout={"news"}/>
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <CardContainer title={"Music"}
                                       description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar. Varius mi posuere leo convallis lobortis arcu tristique ac in."}
                                       imageSrc={"src/assets/image 1.webp"}
                                       imageAlt={"Podcast image"}
                                       showControls={showControls}
                                       layout={"nowPlaying"}/>
                        <div className={"flex flex-col p-6 h-full bg-surface-100-900 rounded-xl shadow-md"}>
                            <h3>Tableau</h3>
                            <div className={"flex flex-col"}>
                                <TimeslotCard title={"Lorem ipsum"}
                                              description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar."}
                                              duration={45}
                                              imageSrc={"src/assets/image 1.webp"}
                                              imageAlt={"Podcast image"}/>
                                <TimeslotCard title={"Lorem ipsum"}
                                              description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar."}
                                              duration={45}
                                              imageSrc={"src/assets/image 1.webp"}
                                              imageAlt={"Podcast image"}/>
                                <TimeslotCard title={"Lorem ipsum"}
                                              description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar."}
                                              duration={45}
                                              imageSrc={"src/assets/image 1.webp"}
                                              imageAlt={"Podcast image"}/>
                                <TimeslotCard title={"Lorem ipsum"}
                                              description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar."}
                                              duration={45}
                                              imageSrc={"src/assets/image 1.webp"}
                                              imageAlt={"Podcast image"}/>
                                <TimeslotCard title={"Lorem ipsum"}
                                              description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar."}
                                              duration={45}
                                              imageSrc={"src/assets/image 1.webp"}
                                              imageAlt={"Podcast image"}/>
                                <TimeslotCard title={"Lorem ipsum"}
                                              description={"Lorem ipsum dolor sit amet consectetur. Nisi cras arcu et pharetra egestas morbi fringilla maecenas pulvinar."}
                                              duration={45}
                                              imageSrc={"src/assets/image 1.webp"}
                                              imageAlt={"Podcast image"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Tableau;