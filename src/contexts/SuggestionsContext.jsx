// I already replaced this file with the suggestionsSlice using Redux JS



import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";




const Suggestions = createContext();


const SuggestionsContext = ({children}) => {

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionLoading, setSuggestionLoading] = useState(false);
    const [usersCity, setUsersCity] = useState("");



    useEffect(() => {
        const controller = new AbortController();

        async function getSuggestions(){
            setSuggestionLoading(true);
            try{
                if(usersCity.length > 3){
                    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${usersCity}&limit=5&appid=777755690ecb518be7c3410d5ae34b00`, {signal: controller.signal});
                    const data = await res.json();
                    setSuggestions(data);
                    setSuggestionLoading(false);
                }
                else{
                    setSuggestions([]);
                    setSuggestionLoading(false);
                }  
            }
            catch(err){
                setSuggestionLoading(false);
                throw new Error(err);
            }
        }

        getSuggestions();

        return () => {
            controller.abort();
        }
        
    }, [usersCity])


  return (
    <Suggestions.Provider value={{
        suggestions,
        setSuggestions,
        suggestionLoading,
        usersCity,
        setUsersCity,
    }}>
      {children}
    </Suggestions.Provider>
  )
}

function UseSuggestions(){
    const context = useContext(Suggestions);
    if(context === undefined) throw new Error("UseSuggestions is being used outside SuggestionsContext wrapper!");
    return context;
}

export { SuggestionsContext, UseSuggestions };

SuggestionsContext.propTypes = {
    children: PropTypes.node,
}
