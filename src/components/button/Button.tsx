import type {ReactNode} from "react";

const Button = ({btnLabel, btnType, btnClasses, btnDisabled, onClickAction}: {
    btnLabel?: string | ReactNode;
    btnType?: 'button' | 'submit';
    btnClasses?: string;
    btnDisabled?: boolean;
    onClickAction?: () => void;
}) => {
    return (
        <button className={`button ${btnClasses} py-2 px-4 rounded-md font-medium shadow-md`}
                type={btnType || 'button'}
                onClick={onClickAction}
                disabled={btnDisabled}>
            {btnLabel}
        </button>
    );
};

export default Button;