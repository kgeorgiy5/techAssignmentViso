import {FC, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

import {IMeal} from "../../types.ts";
import Meal from "./Meal.tsx";
import FilterBar from "./FilterBar.tsx";
import {RootState} from "../../store.ts";
import PageControl from "./PageControl.tsx";
import {setPage} from "../../reducers/paginationReducer.ts";
import usePaginate from "../../hooks/usePaginate.ts";
import useFilter from "../../hooks/useFilter.ts";
import Loading from "../Loading.tsx";
import Error from "../Error.tsx";

const Meals:FC = () => {
    const dispatch = useDispatch();
    const paginate = usePaginate<IMeal>(9);
    const search = useSelector((state:RootState) => state.filter.search);
    const category = useSelector((state:RootState) => state.filter.category);
    const filterByCategory = useFilter(category);
    const currentPage = useSelector((state:RootState) => state.page.currentPage);
    const { data, isLoading, isError} = useQuery({
        queryKey:["mealsData", search, category],
        queryFn: async () => {
            try{
                if(search){
                    const endpoint = import.meta.env.VITE_API_ENDPOINT + `search.php?s=${search}`;
                    const res = await axios.get(endpoint);
                    return res.data.meals || [];
                }

                const meals = [];
                const requests = [];
                for(let i = 97; i < 123; i++){
                    const endpoint = import.meta.env.VITE_API_ENDPOINT + `search.php?f=${String.fromCharCode(i)}`
                    requests.push(axios.get(endpoint));
                }

                const responses = await axios.all(requests)

                for(const res of responses){
                    if(res.data.meals){
                        meals.push(...res.data.meals);
                    }
                }
                return meals;
            } catch(err){
                console.log(err);
            }
        },
    })

    useEffect(() => {
        dispatch(setPage(1))
    }, [search, category]);

    const paginatedMeals = useMemo(() => {
        if(!data) return [];

        const filteredMeals = filterByCategory(data);
        return paginate(filteredMeals);
    }, [filterByCategory, data, paginate]);

    return(
        <main className="w-[60%] min-h-screen justify-between flex flex-col mx-auto pt-4 gap-2">
            <div className="w-full flex flex-col gap-4">
                <FilterBar/>
                {!isError ? (
                    <>
                        {!isLoading ? (
                            <>
                                {paginatedMeals[currentPage-1]?.length > 0 ? (
                                    <>
                                        <ul className="grid grid-cols-3 gap-2 p-2">
                                            {paginatedMeals[currentPage-1].map((meal: IMeal) => (
                                                <Meal key={meal.idMeal} meal={meal}/>
                                            ))}
                                        </ul>
                                        <PageControl/>
                                    </>

                                ) : (
                                    <Error>No meals were found</Error>
                                )
                                }
                            </>
                        ) : (
                            <Loading/>
                        )}
                    </>
                ) : (
                    <Error>An error occurred while loading meals</Error>
                )}
            </div>
        </main>
    )
};

export default Meals;