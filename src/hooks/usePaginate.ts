import {setNumberOfPages} from "../reducers/paginationReducer.ts";
import {useDispatch} from "react-redux";
import {useCallback} from "react";

const usePaginate = <T>(elementsOnPage:number) => {
    const dispatch = useDispatch();

    return useCallback((data:T[] | undefined) => {
        if (!data || data.length === 0) {
            dispatch(setNumberOfPages(0));
            return [];
        }

        const pages: T[][] = [];

        for (let i = 0; i < data.length; i += elementsOnPage) {
            pages.push(data.slice(i, i + elementsOnPage));
        }

        dispatch(setNumberOfPages(pages.length));

        return pages;
    }, [elementsOnPage, dispatch]);
};

export default usePaginate;