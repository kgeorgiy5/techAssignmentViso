import {FC, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useParams} from "react-router-dom";
import parseIngredients from "../../utils/parseIngredients.ts";
import Loading from "../Loading.tsx";
import Error from "../Error";

const MealDetails:FC = () => {
    const id = useParams().id;
    const [ingredients, setIngredients] = useState<{ingredient:string, measure:string}[]>([]);

    const {data, isLoading, isError} = useQuery({
        queryKey:["productDetails"],
        queryFn:async () =>{
            const endpoint = import.meta.env.VITE_API_ENDPOINT + `lookup.php?i=${id}`
            const res = await axios.get(endpoint);
            setIngredients(parseIngredients(res.data.meals[0]));
            return res.data.meals[0];
        }
    })

    return(
        <main className="w-[60%] mx-auto pt-4">
            {!isError ? (
                <>
                    {!isLoading ? (
                        <div className="flex flex-col gap-8">
                            <h2 className="text-2xl text-center">{data.strMeal}</h2>
                            <img src={data.strMealThumb} className="rounded w-[50%] mx-auto" alt={data.strMeal}/>
                            <div className="flex flex-row justify-around">
                                <p>Country: {data.strArea}</p>
                                <p>Category: {data.strCategory}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl text-center">
                                    Instructions
                                </h3>
                                <p>{data.strInstructions}</p>
                            </div>
                            <iframe className="aspect-video w-[50%] mx-auto"
                                    src={data.strYoutube.slice(0, 23) + "/embed/" + data.strYoutube.slice(32, data.strYoutube.length)}></iframe>
                            {ingredients.length>0 && (
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl text-center">
                                        Ingredients
                                    </h3>
                                    {ingredients.map(ingredient => (
                                        <div className={"flex w-[50%] flex-row justify-around mx-auto"}>
                                            <p className="w-full text-center">{ingredient.ingredient}</p>
                                            <p className="w-full text-center">{ingredient.measure}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Loading/>
                    )}
                </>
            ) : (
                <Error>An error occurred while loading meal details</Error>
            )}
        </main>
    )
}

export default MealDetails;