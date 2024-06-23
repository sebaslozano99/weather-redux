import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { typeUsersCity, emptyUsersCity, emptySuggestions } from "../features/suggestionsSlice";
import { useDispatch } from "react-redux";
import { UseUserCitiesContext } from "../contexts/CitiesContext";

const MyCitiesItem = ({element}) => {

  const [modifying, setModifying] = useState(false);
  const { deleteCity } = UseUserCitiesContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if(modifying) {
      dispatch(typeUsersCity(element.cities));
    }
    else{
      dispatch(emptySuggestions());
      dispatch(emptyUsersCity());
    }
  }, [dispatch, modifying, element.cities])

  return (
    <div className={`flex items-center justify-between p-3 bg-white/30 rounded-lg transition-all duration-500 ${modifying ? "border-[1px] border-orange-500" : ""}`} >
        <button className="px-4 rounded bg-white" onClick={() => setModifying(!modifying)} >{modifying ? "Cancel" : "Modify"}</button>
        <h3>{element.cities} - {element.country_code}</h3>
        <button className={`w-[1.7em] h-[1.7em] flex items-center justify-center text-sm`} onClick={() => deleteCity(element.id)} >
          <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
  )
}

export default MyCitiesItem;

MyCitiesItem.propTypes = {
    element: PropTypes.object,
}