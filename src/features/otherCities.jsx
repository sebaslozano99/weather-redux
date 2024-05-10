import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//The bug when adding a new city to the list, is that we are only adding a new city name to the "cities" state. In this case, the open weather api automatically fetches the data from the most famous city with that name -- to fix this, we must fetch the data of each city by "CITY NAME" and "COUNTRY CODE", in this way, if there are multiple cities in the world with the same name, will be fetching the one is picked by the user. Thus, when adding a new city, instead of adding only the name of the city, We'll add city's name and country code.

const initialValues = {
  //cities: ["moscow", "bogota", "berlin", "tokio"], 
    cities: [
        {name: "moscow", countryCode: "RU", },
        {name: "bogota", countryCode: "CO", },
        {name: "berlin", countryCode: "DE", },
        {name: "tokio", countryCode: "JP", },
    ],
    citiesInfo: [],
    isLoading: false,
}


export const getOtherCities = createAsyncThunk("otherCities/fetchInfo", async (cities) => {
    let weatherInfoCities = [];
    for(let i = 0; i < cities.length; i++){
        try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i].name},${cities[i].countryCode}&appid=777755690ecb518be7c3410d5ae34b00`);
            // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=777755690ecb518be7c3410d5ae34b00`);
            const data = await res.json();
            weatherInfoCities.push(data);
        }
        catch(error){
            throw new Error(error);
        }
    }
    return weatherInfoCities;
})


const otherCities = createSlice({
    name: "otherCities",
    initialState: initialValues,
    reducers: {
        add(state, action){
            state.cities.push(action.payload);
        },
        changeOneCity(state, action){
            state.cities = state.cities.map(element => element === action.payload.city ? action.payload.newCity : element);
        },
        deleteCity(state, action){
            state.cities = state.cities.filter(element => element === action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOtherCities.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getOtherCities.fulfilled, (state, action) => {
            state.citiesInfo = action.payload;
            // state.citiesInfo = [...state.citiesInfo, action.payload]; I had it like this, but I was duplicating the data
            state.isLoading = false;
        }),
        builder.addCase(getOtherCities.rejected, (state) => {
            state.isLoading = false;
        })

    }
})


export default otherCities.reducer;
export const { add, changeOneCity, deleteCity } = otherCities.actions;