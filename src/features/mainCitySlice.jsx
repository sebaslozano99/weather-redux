import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialValues = {
    cityName: "soledad",
    countryCode: "VE",
    cityInfo: {},
    isLoading: false,
    error: "",
}   


export const getMainCityInfo = createAsyncThunk("mainCity/getInfo", async ({cityName, countryCode} , {dispatch, getState}) => {
    const currentInfo = getState().mainCity;

    try{
        // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=777755690ecb518be7c3410d5ae34b00`);

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=777755690ecb518be7c3410d5ae34b00`);
      
        
        if(res.status === 404) {
            alert(`${cityName} does not exist!`);
            dispatch(changeCity(currentInfo?.cityInfo?.name?.toLowerCase())); //in case the user's input is a non-existing city, the WEATHERAPI re-fetch the previous city, which means that in the initialState above the "cityName" will be the one the user entered, but the "cityInfo" will be the city before the user's input. Hence, we will change the "cityName" to the city inside the "cityInfo". 
        }

        if(!res.ok) throw new Error("!failed fetching data!");
        
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
            state.cityName = action.payload.cityName;
            state.countryCode = action.payload.countryCode ;
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
        builder.addCase(getMainCityInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    }
})


export default mainCitySlice.reducer;
export const { changeCity } = mainCitySlice.actions;