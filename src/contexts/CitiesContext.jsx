import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { clientSupabase } from "../supabase/client";
import { UseAuthContext } from "./AuthContext";


const CitiesSupabase = createContext();


const initialState = {
    userCities: [
        // {
        //     name: "new york",
        //     countryCode: "CO",
        // }
    ],
    userCitiesInfo: [],
    userIsLoading: false,
    userError: "",
}

function reducer(state, action){
    switch(action.type){
        case "userCities/arrived": 
            return {
                ...state,
                userCities: [...state.userCities, action.payload],
                // userCities: action.payload
            }
        case "error/setError":
            return {
                ...state,
                error: action.payload,
            }
        default: throw new Error("Unknown action type!");
    }
}



const CitiesContext = ({children}) => {

  const { user } = UseAuthContext();
  const [{userCities, userCitiesInfo, userIsLoading, userError}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getCitiesAndCountryCodes(user);
    }, [user])

    async function getCitiesAndCountryCodes(user){

        if(!user) return;

        try{
            const { data, error } = await clientSupabase
            .from("cities")
            .select()
            // .eq("user_id", user?.user.id)
    
            if(error){
                dispatch({type: "error/setError", payload: error.description || error.message});
                console.log(error);
            }
    
            // dispatch({type: "userCities/arrived", payload: data});
            console.log(data);
            
        }catch(error){
            throw new Error(error);
        }
    }


  return (
    <CitiesSupabase.Provider value={{
        userCities,
        userCitiesInfo,
        userIsLoading,
        userError,
    }}>
        {children}
    </CitiesSupabase.Provider>
  )
}


function UseUserCitiesContext(){
    const context = useContext(CitiesSupabase);
    if(context === undefined) throw new Error("UseUserCitiesContext is being used outside of 'CitiesContext' wrapper!");
    return context;
}

export { CitiesContext, UseUserCitiesContext };

CitiesContext.propTypes = {
    children: PropTypes.node,
}
