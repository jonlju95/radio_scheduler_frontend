import type {ReactNode} from "react";

const ContentBody = ({children}: { children?: ReactNode }) => {
    return (
        <div className={"flex"}>
            {children}
        </div>
    );
};

export default ContentBody;