import type {ReactNode} from "react";

const ContentBody = ({children}: { children?: ReactNode }) => {
    return (
        <div className={"flex h-full"}>
            {children}
        </div>
    );
};

export default ContentBody;