import { configureStore } from "@reduxjs/toolkit";
import mainCitySlice from "./features/mainCity/mainCitySlice";
import otherCities from "./features/otherCities/otherCities";
import fourWeatherForecast from "./features/fourWeatherForecast";
import suggestionsSlice from "./features/suggestionsSlice";

const store = configureStore({
    reducer: {
        mainCity: mainCitySlice,
        otherCities: otherCities,
        fourDaysWeather: fourWeatherForecast,
        suggestions: suggestionsSlice,
    }
})


export default store;