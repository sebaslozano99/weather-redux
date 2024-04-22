import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialValues = {
    cityName: "new york",
    cityInfo: {},
    isLoading: false,
}


export const getMainCityInfo = createAsyncThunk("mainCity/getInfo", async (cityName) => {
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=777755690ecb518be7c3410d5ae34b00`);
        const data = await res.json();
        return data;
    }catch(error){
        throw new Error(error);
    }
})



const mainCitySlice = createSlice({
    name: "mainCity",
    initialState: initialValues,
    reducers: {
        changeCity(state, action){
            state.cityName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMainCityInfo.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getMainCityInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cityInfo = action.payload;
        }),
        builder.addCase(getMainCityInfo.rejected, (state) => {
            state.isLoading = false;
        })
    }
})


export default mainCitySlice.reducer;
export const { changeCity } = mainCitySlice.actions;