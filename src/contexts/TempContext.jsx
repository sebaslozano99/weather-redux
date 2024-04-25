import { createContext, useContext, useReducer } from "react";
import PropTypes from "proptypes";


const Temp = createContext();

const initialValue = {
    temperatureType: false,
    theme: false, //false === light : true === dark
}


function reducer(state, action){
    switch(action.type){
        case "temp/change":
            return {
                ...state,
                temperatureType: !state.temperatureType,
            }
        case "theme/change":
            return {
                ...state,
                theme: !state.theme,
            }
        default: throw new Error("Unknown action type!");
    }
}

const TempContext = ({children}) => {

  const [{temperatureType, theme}, dispatch] = useReducer(reducer, initialValue);

  function onChangeTempType(){
    dispatch({type: "temp/change"});
  }

  function onChangeTheme(){
    dispatch({type: "theme/change"});
  }

  return (
    <Temp.Provider  value={{
        temperatureType,
        theme,
        onChangeTempType,
        onChangeTheme
    }}>
        {
            children
        }
    </Temp.Provider>
  )
}


function UseTempContext(){
    const context = useContext(Temp);
    if(context === undefined) throw new Error("UseTempContext is being used outside TemoContext wrapper!");
    return context;
}

export { TempContext, UseTempContext };

TempContext.propTypes = {
    children: PropTypes.node,
}