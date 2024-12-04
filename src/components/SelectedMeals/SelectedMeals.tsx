import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import {ISelectedMeal} from "../../types.ts";
import Button from "../Button.tsx";
import {clearSelected} from "../../reducers/selectedReducer.ts";

const SelectedMeals:FC = () => {
    const meals = useSelector((state:RootState) => state.selected.meals);
    const dispatch = useDispatch();
    const ingredients = useSelector((state:RootState) => state.selected.ingredients);

    const handleClearSelected = () => {
        dispatch(clearSelected());
    }

    return(
        <main className="w-[60%] mx-auto gap-8 p-4 flex flex-col min-h-screen">
            <Button className="w-full" onClick={handleClearSelected}>Clear selected meals</Button>
                    {meals.length > 0 ? (
                        <ul className="flex overflow-auto flex-col gap-2">
                            {meals.map((meal:ISelectedMeal) => (
                                <li key={meal.idMeal} className="flex flex-col gap-4">
                                    <h2 className="text-xl">{meal.strMeal}</h2>
                                    <div className="flex flex-row gap-8">
                                        <img className="aspect-square w-[10rem]" alt={meal.strMeal}
                                             src={meal.strMealThumb}/>
                                        <p className="line-clamp-4 overflow-auto">{meal.strInstructions}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recipes selected</p>
                    )}
            {ingredients.length > 0 ? (
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl text-center">Used ingredients</h2>
                    <div className="grid-cols-3 grid">
                        {ingredients.map((ingredient:string) => (
                            <p>
                                {ingredient}
                            </p>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No ingredients found</p>
            )}
        </main>
    )
}

export default SelectedMeals;