import {FC} from "react";

interface ErrorProps {
    children: string;
}

const Error:FC<ErrorProps> = ({children}) => {
    return (
        <div className={"text-2xl flex flex-col justify-center place-items-center w-full h-[20vh]"}>
            <p >{children}</p>
        </div>
    )
};

export default Error;