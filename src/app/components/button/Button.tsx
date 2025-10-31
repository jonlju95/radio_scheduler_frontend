import type {ReactNode} from "react";

const Button = ({btnLabel, btnType, btnClasses, onClickAction}: {
    btnLabel?: string | ReactNode;
    btnType?: 'button' | 'submit';
    btnClasses?: string[];
    onClickAction?: () => void;
}) => {
    return (
        <button className={`button ${btnClasses} py-2.5 px-5 rounded-md font-medium`}
                type={btnType || 'button'}
                onClick={onClickAction}>
            {btnLabel}
        </button>
    );
};

export default Button;