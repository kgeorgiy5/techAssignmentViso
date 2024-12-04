import {FC, MouseEvent, ReactNode} from "react";

interface ButtonProps {
    onClick: (e:MouseEvent) => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
}

const Button:FC<ButtonProps> = ({className, onClick, children, disabled}) => {
    return(
        <button onClick={(e:MouseEvent) => onClick(e)}
                disabled={disabled}
                className={`disabled:bg-zinc-400 disabled:text-black text-white rounded p-2 bg-slate-400 hover:bg-slate-600 transition-colors delay-75 duration-100 hover:text-white ${className}`}>
            {children}
        </button>
    )
};

export default Button;