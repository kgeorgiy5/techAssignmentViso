import {FC, useEffect, useState} from "react";
import Button from "../Button.tsx";
import useDebounce from "../../hooks/useDebounce.ts";
import CategoriesDropdown from "./CategoriesDropdown.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import {setSearch} from "../../reducers/filterReducer.ts";

const FilterBar:FC = () => {
    const dispatch = useDispatch();
    const [showCategories, setShowCategories] = useState(false);
    const [debouncedInput, setDebounceInput, searchInput, setSearchInput] = useDebounce<string>("", 1000);
    const category = useSelector((state:RootState) => state.filter.category);

    const handleSearchInput = (value:string) => {
        setSearchInput(value);
    }

    useEffect(() => {
        dispatch(setSearch(debouncedInput));
    }, [debouncedInput]);

    useEffect(() => {
        setShowCategories(false);
    }, [category]);

    return(
        <div className="relative justify-self-start">
            <div className="flex flex-row gap-2 justify-around">
                <div className="w-full flex flex-row gap-1">
                    <input className="border-b-slate-500 border-b-2 w-full focus:outline-0" placeholder="Search"
                           onChange={(e) => handleSearchInput(e.target.value)}/>
                    <Button onClick={() => setDebounceInput(searchInput)}>Search</Button>
                </div>
                <Button className="w-full"
                        onClick={() => setShowCategories(state => !state)}>{category ? `Current category: ${category}` : "Select Category"}</Button>
            </div>
            {showCategories && (
                <CategoriesDropdown/>
            )}
        </div>
    )
}

export default FilterBar;