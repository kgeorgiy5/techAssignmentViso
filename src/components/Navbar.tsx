import {FC} from 'react';
import {Link, useLocation} from "react-router-dom";

const Navbar:FC = () => {
    const currentPath = useLocation().pathname;

    return(
        <header className="sticky flex flex-row z-30 p-4 gap-4 bg-slate-300 top-0">
            <h1 className="align-middle text-[2rem] font-bold">Meals</h1>
            <nav className="flex  flex-row gap-4 bg-white w-fit p-4 rounded">
                <Link className={`${currentPath === "/" ? "font-bold" : ""} hover:underline`} to="/">Meal List</Link>
                <Link className={`${currentPath === "/selected" ? "font-bold" : ""} hover:underline`} to="/selected">Selected Meals</Link>
            </nav>
        </header>
    );
};

export default Navbar;