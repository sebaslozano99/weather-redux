import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialValues = {
    cities: ["moscow", "bogota", "berlin", "tokio"],
    citiesInfo: [],
    isLoading: false,
}


export const getOtherCities = createAsyncThunk("otherCities/fetchInfo", async (cities) => {
    const weatherInfoCities = [];
    for(let i = 0; i < cities.length; i++){
        try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=777755690ecb518be7c3410d5ae34b00`);
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
            state.citiesInfo = [...state.citiesInfo, action.payload];
            state.isLoading = false;
        }),
        builder.addCase(getOtherCities.rejected, (state) => {
            state.isLoading = false;
        })

    }
})


export default otherCities.reducer;
export const { add, changeOneCity, deleteCity } = otherCities.actions;