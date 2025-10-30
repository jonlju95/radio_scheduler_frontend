import {useNavigate} from "react-router-dom";
import Button from "../button/Button.tsx";

const ContentHeader = ({title, navTarget, btnLabel, detailPage}: {
    title: string;
    navTarget?: string;
    btnLabel?: string;
    detailPage?: boolean | false;
}) => {
    const navigate = useNavigate();

    return (
        <div className={"flex justify-between items-center py-3 mb-8 border-b border-b-surface-950-50 h-16"}>
            {detailPage ? (
                <div className={"flex items-center w-full h-full"}>
                    <svg
                        className={"h-full mr-2 rotate-180 cursor-pointer"}
                        onClick={() => navigate(-1)}
                        viewBox="-4 -4 32 32"
                        id="chevron"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 6.1428817,1.0000087 17.857157,12 6.1428817,22.999991"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            id="path1"/>
                    </svg>
                    <h3>{title}</h3>
                </div>
            ) : <>
                <h3>{title}</h3>
                {navTarget ? (<Button btnLabel={btnLabel}
                                      btnClasses={["button btn-primary"]}
                                      onClickAction={() => navigate(navTarget, {state: {row: {id: "new"}}})}>
                </Button>) : null}
            </>
            }
        </div>
    );
};

export default ContentHeader;