import {type ReactNode} from 'react';
import {useNavigate} from "react-router-dom";
import {HiArrowLeftStartOnRectangle} from "react-icons/hi2";
import {useAuth} from "../../contexts/auth/UseAuth.tsx";

type TooltipContent = { href: string; label: string }[];

type TooltipProps = {
    content: TooltipContent;
    children: ReactNode;
};

const Tooltip = ({children, content}: TooltipProps) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const renderContent = () => {
        if (Array.isArray(content)) {
            return (
                <ul className="flex flex-col w-full">
                    {content.map((item, i) => (
                        <li key={i}>
                            <a href={item.href.toLowerCase()}
                               className="p-2 inline-block w-full hover:bg-secondary-300-700 hover:font-bold rounded-sm">
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li className={"p-2 w-full hover:font-bold rounded-sm" +
                        " cursor-pointer flex items-center"} onClick={handleLogout}>
                        <HiArrowLeftStartOnRectangle className={"me-2 text-lg text-tertiary-700-300"}/>
                        <p>Log out</p>
                    </li>
                </ul>
            );
        }

        return <p>{content}</p>;
    }

    return (
        <div className={"relative group inline-block"}>
            {children}

            <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100
                      transition duration-250 ease-in-out bg-secondary-200-800 p-2 rounded-md shadow-sm
                      left-1/2 -translate-x-1/2 top-full z-50 w-48">
                {renderContent()}
            </div>
        </div>
    );
};

export default Tooltip;