import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FilterReducer{
    search: string;
    category: string;
}

const initialState:FilterReducer={
    search:"",
    category:"",
}

const filterSlice = createSlice({
    name:"filter",
    initialState:initialState,
    reducers:{
        setSearch: (state, action:PayloadAction<string>) => {
            state.search = action.payload;
            state.category = "";
        },
        setCategory: (state, action:PayloadAction<string>) => {
            state.category = action.payload;
            state.search = "";
        }
    }
})

export const {setSearch,setCategory} = filterSlice.actions;
export default filterSlice.reducer;