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
                userCities: action.payload,
            }
        case "userCities/newTask":
            return {
                ...state,
                userCities: [...state.userCities, action.payload]
            }
        case "userCities/emptyIt":
            return {
                ...state,
                userCities: [],
                userCitiesInfo: [],
            }
        case "error/setError":
            return {
                ...state,
                error: action.payload,
            }
        case "userIsLoading/set":
            return {
                ...state,
                userIsLoading: action.payload,
            }
        case "userCitiesInfo/set":
            return {
                ...state,
                userCitiesInfo: action.payload,
            }
        default: throw new Error("Unknown action type!");
    }
}



const CitiesContext = ({children}) => {

  const { user } = UseAuthContext();
  const [{ userCities, userCitiesInfo, userIsLoading, userError}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(userCities);
  }, [userCities])

    useEffect(() => {
        getCitiesAndCountryCodes(user?.user.id);
    }, [user])

    useEffect(() => {
        fetchCitiesOpenWeatherData(user, userCities);
    }, [user, userCities])


    useEffect( () => {
        const channel = clientSupabase
        .channel("on-db-changes")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
            },
            (payload) => {
                console.log(payload);
                dispatch({type: "userCities/newTask", payload: {cities: payload?.new?.cities, country_code: payload?.new?.country_code} });

            }
        )
        .subscribe();


        return () => {
            channel.unsubscribe();
        }
    }, [])


    async function getCitiesAndCountryCodes(user){

        if(!user) return;

        try{
            const { data, error } = await clientSupabase
            .from("cities")
            .select("cities, country_code, id")
            .eq("user_id", user)
            // .eq("user_id", user?.user.id)
    
            if(error){
                dispatch({type: "error/setError", payload: error.description || error.message});
                console.log(error);
            }
    
            dispatch({type: "userCities/arrived", payload: data});

        }catch(error){
            throw new Error(error);
        }
    }

    async function addNewCity(city, country_code, user_id){
        
        if(userCities.some((element) => element.cities === city && element.country_code === country_code)){
            alert(`The city ${city}-${country_code} is already in your list!`);
            return;
        }


        dispatch({type: "userIsLoading/set", payload: true});
        try{
            const { data, error } = await clientSupabase
            .from("cities")
            .insert({
                cities: city,
                country_code: country_code,
                user_id: user_id
            })
            .single()

            if(error) {
                console.log(error);
                throw new Error(error);
            } 

            if(data){
                dispatch({type: "userCities/newTask", payload: data});
                console.log("Added successfully!");
            }
        }
        catch(error){
            console.log("Supabase error: ", error);
            throw new Error(error.message);
        }
        finally{
            dispatch({type: "userIsLoading/set", payload: false});
        }
    }


    async function fetchCitiesOpenWeatherData(user, cities){
        if(!user || !cities.length) return;
        const fetchedCitiesData = [];
        try{
            for(let i = 0; i < cities.length; i++){
                // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]?.cities}&appid=777755690ecb518be7c3410d5ae34b00`);
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]?.cities},${cities[i]?.country_code}&appid=777755690ecb518be7c3410d5ae34b00`)
                const data = await res.json();
                fetchedCitiesData.push(data);
            }
        }
        catch(error){
            throw new Error(error);
        }

        dispatch({type: "userCitiesInfo/set", payload: fetchedCitiesData});

    }


  return (
    <CitiesSupabase.Provider value={{
        userCities,
        userCitiesInfo,
        userIsLoading,
        userError,
        addNewCity,
        dispatch
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
