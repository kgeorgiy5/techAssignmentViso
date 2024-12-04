import {configureStore, Store} from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer.ts";
import paginationReducer from "./reducers/paginationReducer.ts";
import selectedReducer from "./reducers/selectedReducer.ts";

const store = configureStore({
    reducer:{
        filter: filterReducer,
        page: paginationReducer,
        selected: selectedReducer,
    }
});

export type RootState = ReturnType<Store["getState"]>
export default store;