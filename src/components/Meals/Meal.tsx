import {FC, MouseEvent} from "react";
import {IMeal, ISelectedMeal} from "../../types.ts";
import Button from "../Button.tsx";
import {useNavigate} from "react-router-dom";
import parseIngredients from "../../utils/parseIngredients.ts";
import {useDispatch} from "react-redux";
import {addMeal} from "../../reducers/selectedReducer.ts";

interface MealProps{
    meal: IMeal
}

const Meal:FC<MealProps> = ({meal}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelection = (e:MouseEvent) => {
        e.stopPropagation();
        const mealDetails:ISelectedMeal = {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strInstructions: meal.strInstructions,
            strMealThumb:meal.strMealThumb
        }

        const ingredients = parseIngredients(meal);
        dispatch(addMeal({meal:mealDetails, ingredients:ingredients}))
    }

    const handleMealClick = () => {
        navigate(`/meal/${meal.idMeal}`)
    }

    return(
        <li onClick={handleMealClick} className="cursor-pointer flex flex-col gap-1 p-2 hover:shadow-2xl hover:scale-105 transition-shadow bg-slate-500 rounded">
            <h3 className="text-center text-2xl line-clamp-1 text-white">{meal.strMeal}</h3>
            <img className="rounded" alt={meal.strMeal} src={meal.strMealThumb}/>
            <div className="flex flex-row justify-between text-white">
                <p>{meal.strArea}</p>
                <p>{meal.strCategory}</p>
            </div>
            <Button onClick={handleSelection}>Select Meal</Button>
        </li>
    )
};

export default Meal;