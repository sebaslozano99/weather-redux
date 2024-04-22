import { configureStore } from "@reduxjs/toolkit";
import  mainCitySlice  from "./features/mainCitySlice";
import otherCities from "./features/otherCities";

const store = configureStore({
    reducer: {
        mainCity: mainCitySlice,
        otherCities: otherCities,
    }
})


export default store;