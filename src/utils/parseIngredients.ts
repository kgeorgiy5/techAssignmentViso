import {IIngredient, IMeal} from "../types.ts";

const parseIngredients = (meal: IMeal) => {
    const ingredients: IIngredient[] = [];

    for(let i = 1; i <=20; i++){
        const ingredientKey = meal[`strIngredient${i}` as keyof IMeal];
        const measureKey = meal[`strMeasure${i}` as keyof IMeal];
        if(ingredientKey && measureKey){
            ingredients.push({
                ingredient: ingredientKey,
                measure: measureKey,
            })
        }
    }

    return ingredients;
};

export default parseIngredients;