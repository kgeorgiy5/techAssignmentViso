import {FC, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import PageButton from "./PageButton.tsx";
import Button from "../Button.tsx";
import {decrementPage, incrementPage} from "../../reducers/paginationReducer.ts";

const PageControl:FC = () => {
    const pages = useSelector((state:RootState) => state.page);
    const dispatch = useDispatch();

    const handleArrowButtons = (type:"increment" | "decrement") => {
        if(type === "increment"){
            dispatch(incrementPage());
        } else if (type==="decrement"){
            dispatch(decrementPage());
        }
    }

    const pageButtons = useMemo(() => {
        const pageButtons = [];

        pageButtons.push(
            <Button key={"<"} className="align-baseline" onClick={() => handleArrowButtons("decrement")}>{"<"}</Button>
        )
        if(pages.numberOfPages <= 10){
            for(let i = 1; i <= pages.numberOfPages; i++){
                pageButtons.push(
                    <PageButton key={i} number={i}/>
                )
            }
        } else {
            for(let i = 1; i <= 7; i++){
                pageButtons.push(
                    <PageButton key={i} number={i}/>
                )
            }

            if(pages.currentPage > 7 && pages.currentPage !== pages.numberOfPages){
                pageButtons.push(
                    <span>...</span>,
                    <PageButton key={pages.currentPage} number={pages.currentPage}/>,
                )
            }

            pageButtons.push(
                <span>...</span>,
                <PageButton key={pages.numberOfPages} number={pages.numberOfPages}/>
            )
        }
        pageButtons.push(
            <Button key={">"} className="align-baseline" onClick={() => handleArrowButtons("increment")}>{">"}</Button>
        )

        return pageButtons;
    }, [pages.numberOfPages, pages.currentPage])

    return(
        <>
            {pages.numberOfPages ? (
                <>
                    {pageButtons.length > 3 ? (
                        <div className="align-middle items-center mx-auto mt-8 flex flex-row gap-1">
                            {pageButtons.map(pageButton => (
                                <>
                                    {pageButton}
                                </>
                                )
                            )}
                        </div>
                    ) : null}
                </>
            ) : null}
        </>
    )
};

export default PageControl;