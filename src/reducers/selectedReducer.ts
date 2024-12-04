import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIngredient, ISelectedMeal} from "../types.ts";

interface AddMealPayload{
    meal: ISelectedMeal;
    ingredients: IIngredient[];
}

interface SelectedState {
    meals: ISelectedMeal[];
    ingredients: string[];
}

const initialState:SelectedState = {
    meals:[],
    ingredients: []
}

const selectedSlice = createSlice({
    name:"selected",
    initialState:initialState,
    reducers:{
        addMeal: (state, action:PayloadAction<AddMealPayload>) => {
            if(state.meals.find(meal => meal.idMeal === action.payload.meal.idMeal)){
                return;
            }

            state.meals.push(action.payload.meal);
            for(const ingredient of action.payload.ingredients){
                if(state.ingredients.indexOf(ingredient.ingredient) !== -1){
                    return;
                }
                state.ingredients.push(ingredient.ingredient);
            }
        },
        clearSelected:(state) =>{
            state.meals = [];
            state.ingredients = [];
        }
    }
})

export const {addMeal, clearSelected} = selectedSlice.actions;
export default selectedSlice.reducer;