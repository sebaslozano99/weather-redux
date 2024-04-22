import { configureStore } from "@reduxjs/toolkit";
import  mainCitySlice  from "./mainCitySlice";

const store = configureStore({
    reducer: {
        mainCity: mainCitySlice,
    }
})


export default store;