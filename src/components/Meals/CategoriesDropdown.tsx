import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {ICategory} from "../../types.ts";
import CategoryButton from "./CategoryButton.tsx";

const CategoriesDropdown = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey:["categories"],
        queryFn:async () => {
            const endpoint = import.meta.env.VITE_API_ENDPOINT + `categories.php`;
            const res = await axios.get(endpoint);
            return res.data.categories;
        }
    });

    return (
        <div className="absolute z-40 bg-white m-auto w-full p-8 box-border shadow-2xl rounded mt-2">
            {isError ? (
                <p>An error occurred while fetching categories</p>
            ) : isLoading ? (
                <p>Loading categories...</p>
            ) : data && data.length > 0 ? (
                <ul className="grid grid-cols-2 gap-2 overflow-auto">
                    {data.map((category: ICategory) => (
                        <CategoryButton category={category} key={category.idCategory}/>
                    ))}
                </ul>
            ) : (
                <p>No categories available.</p>
            )}
        </div>
    )
};

export default CategoriesDropdown;