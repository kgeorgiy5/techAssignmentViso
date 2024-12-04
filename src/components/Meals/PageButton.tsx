import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../reducers/paginationReducer.ts";
import {RootState} from "../../store.ts";

interface PageButtonProps {
    number: number;
}

const PageButton:FC<PageButtonProps> = ({number}) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state:RootState) => state.page.currentPage);

    const handleButtonClick = () => {
        dispatch(setPage(number));
    }

    return(
        <button disabled={currentPage === number} className={`transition hover:bg-slate-200 aspect-square rounded w-8 p-1 ${currentPage === number ? "bg-slate-400 hover:bg-slate-400 text-white" : ""}`} onClick={handleButtonClick}>
            {number}
        </button>
    )
};

export default PageButton;