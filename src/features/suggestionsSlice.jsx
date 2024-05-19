import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialValues = {
    suggestions: [],
    suggestionsIsLoading: false,
    error: "",
    usersCity: "",
}


export const getSuggestions = createAsyncThunk("suggestions/getSuggestions", async (usersCity, { dispatch }) => {
    try {
        if(usersCity.length > 3){
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${usersCity}&limit=5&appid=777755690ecb518be7c3410d5ae34b00` );
            const data = await res.json();
            return data;
        }else{
            dispatch(emptySuggestions())
        }
    }catch(err){
        throw new Error(err);
    }
})



const suggestionsSlice = createSlice({
    name: "suggestionsSlice",
    initialState: initialValues,
    reducers: {
        typeUsersCity(state, action){
            state.usersCity = action.payload;
        },
        emptySuggestions(state) {
            state.suggestions = [];
        },
        emptyUsersCity(state){
            state.usersCity = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSuggestions.pending, (state) => {
            state.suggestionsIsLoading = true;
        }),
        builder.addCase(getSuggestions.fulfilled, (state, action) => {
            state.suggestionsIsLoading = false;
            state.suggestions = action.payload;
        }),
        builder.addCase(getSuggestions.rejected, (state, action) => {
            state.error = action.payload;
            state.suggestionsIsLoading = false;
        })
    }
})

export default suggestionsSlice.reducer;
export const { typeUsersCity, emptySuggestions, emptyUsersCity } = suggestionsSlice.actions;


