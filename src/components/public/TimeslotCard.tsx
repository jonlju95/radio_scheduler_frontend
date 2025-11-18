interface CardProps {
    title: string;
    description: string;
    duration: number;
    imageSrc: string;
    imageAlt: string;
}

const TimeslotCard = ({ title, description, duration, imageSrc, imageAlt }: CardProps) => {
    return (
        <div className={"flex border border-surface-200-800 rounded-xl mt-3 h-40 shadow-md"}>
            <div className={"flex h-full aspect-video"}>
                <img src={imageSrc} alt={imageAlt} className={"w-full rounded-l-xl"}/>
            </div>
            <div className={"p-4 w-full h-full flex flex-col justify-between"}>
                <div>
                    <h5>{title}</h5>
                    <p>{description}</p>
                </div>
                <p>{duration} min</p>
            </div>
        </div>
    );
};

export default TimeslotCard;