import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PaginationReducer {
    currentPage: number;
    numberOfPages: number;
}

const initialState:PaginationReducer = {
    currentPage: 1,
    numberOfPages: 1
}

const paginationSlice = createSlice({
    name:"page",
    initialState: initialState,
    reducers:{
        setNumberOfPages: (state, action:PayloadAction<number>) => {
            state.numberOfPages = action.payload;
        },
        setPage: (state, action:PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        incrementPage: (state) => {
            if(state.currentPage >= state.numberOfPages){
                return;
            }

            state.currentPage++;
        },
        decrementPage: (state) => {
            if(state.currentPage <= 1){
                return;
            }

            state.currentPage--;
        }
    }
})

export const {setNumberOfPages, setPage, incrementPage, decrementPage} = paginationSlice.actions;
export default paginationSlice.reducer;