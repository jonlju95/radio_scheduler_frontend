import {cn} from "../../utils/cn.ts";

const classList: string[] = ["flex", "justify-between", "items-center", "bg-primary-900-100",
    "text-surface-50-950", "px-32", "h-40", "w-[100vw]"];

const Footer = () => {
    return (
        <footer className={cn(classList)}>
            <h5>2025</h5>
            <div>
                <p>Images from <a className={"hover:underline"} href={"https://www.pexels.com/"} target={"_blank"}>pexels.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;