import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialValues = {
    fourDaysForecast: [],
    fourWeatherForecastIsLoading: false,
}


export const getFourDaysWwatherForecast = createAsyncThunk("fourWeatherForecast/getInfo", async ({lat, lon}) => {
    try{
        // const res = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=777755690ecb518be7c3410d5ae34b00`);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=777755690ecb518be7c3410d5ae34b00`);
        const data = await res.json();
        return data;
    }
    catch(error){
        throw new Error(error);
    }
})


const fourDaysForecast = createSlice({
    name: "fourWeatherForecast",
    initialState: initialValues,
    reducers:{
        changeLocation(state, action){
            state.fourDaysForecast = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFourDaysWwatherForecast.pending, (state) => {
            state.fourWeatherForecastIsLoading = true;
        }),
        builder.addCase(getFourDaysWwatherForecast.fulfilled, (state, action) => {
            state.fourWeatherForecastIsLoading = false;
            state.fourDaysForecast = action.payload;
        }),
        builder.addCase(getFourDaysWwatherForecast.rejected, (state) => {
            state.fourWeatherForecastIsLoading = false;
        })
    }
})


export default fourDaysForecast.reducer;
export const { changeLocation } = fourDaysForecast.actions;