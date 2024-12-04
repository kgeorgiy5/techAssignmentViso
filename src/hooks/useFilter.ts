import {IMeal} from "../types.ts";
import {useCallback} from "react";

const useFilter = (category:string) => {
   return useCallback((data:IMeal[]) => {
       if(!category || !data) {
           return data;
       }

       const filteredMeals = data.filter((element: IMeal) => element.strCategory === category);
       return filteredMeals;
   }, [category]);
}

export default useFilter;