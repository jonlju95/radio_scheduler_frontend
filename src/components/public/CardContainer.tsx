import {cva, type VariantProps} from "class-variance-authority";
import PlayButton from "./PlayButton.tsx";

const cardVariants = cva(
    "bg-surface-100-900 rounded-xl shadow-md border border-surface-200-800",
    {
        variants: {
            layout: {
                news: "pe-8 flex justify-between items-center min-h-48 mb-4",
                nowPlaying: "p-6 mb-6"
            },
        },
        defaultVariants: {
            layout: "news"
        }
    }
);

interface CardProps extends VariantProps<typeof cardVariants> {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    showControls: (title: string) => void;
}

const CardContainer = ({title, description, imageSrc, imageAlt, layout, showControls}: CardProps) => {
    const isNewsContainer = layout === "news";

    return (
        <div className={cardVariants({layout})}>
            {isNewsContainer ? (
                <>
                    <div className={"flex h-full aspect-video max-w-1/3"}>
                        <img src={imageSrc} alt={imageAlt} className={"w-full rounded-l-xl"}/>
                    </div>
                    <div className={"p-4 w-full h-full"}>
                        <h5>{title}</h5>
                        <p>{description}</p>
                    </div>
                    <PlayButton onClick={() => showControls(title)}/>
                </>
            ) : (
                <>
                    <div className={"flex justify-between items-center mb-4"}>
                        <h3>Now playing</h3>
                        <PlayButton onClick={() => showControls(title)}/>
                    </div>
                    <div className={"flex"}>
                        <img src={imageSrc} alt={imageAlt} className={"w-1/2 rounded-xl me-4"}/>
                        <div className={"flex flex-col w-1/2"}>
                            <h6>{title}</h6>
                            <p className={"mt-4"}>{description}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CardContainer;