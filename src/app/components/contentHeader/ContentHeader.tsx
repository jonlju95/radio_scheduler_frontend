import {useNavigate} from "react-router-dom";
import Button from "../button/Button.tsx";
import {HiChevronLeft} from "react-icons/hi2";

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
                    <HiChevronLeft className={"h-full w-auto mr-2 cursor-pointer"}
                                   onClick={() => navigate(-1)}/>
                    <h3 className={"w-full"}>{title}</h3>
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