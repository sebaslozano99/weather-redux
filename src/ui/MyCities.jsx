import { useEffect } from "react";
import { UseUserCitiesContext } from "../contexts/CitiesContext";
import { useDispatch, useSelector } from "react-redux";
import { emptySuggestions, emptyUsersCity, typeUsersCity } from "../features/suggestionsSlice";
import MyCitiesItem from "./MyCitiesItem";

const MyCities = () => {

    const { userCities, updateCity } = UseUserCitiesContext();
    const { suggestions, suggestionsIsLoading, usersCity } = useSelector((store) => store.suggestions);
    const dispatch = useDispatch();


    useEffect(() => {
        console.log(userCities);
    }, [userCities])


    function onUpdateCity(index){
      const rightCityName = suggestions?.at(index)?.name.toLowerCase();
      const rightCountry = suggestions?.at(index)?.country.toLowerCase();
      const rightId = userCities?.find(element => element.cities === rightCityName && element.country_code);
      console.log(rightId);
      console.log(rightCityName, rightCountry);

      updateCity(rightCityName, rightCountry, rightId?.id);
      dispatch(emptySuggestions());
      dispatch(emptyUsersCity());
    }

  return (
    <div className="w-[85%] h-full border-2">

      <form className="h-[15%] border-2 border-yellow-400 flex justify-center items-center" >

        <div>

          <input type="text" placeholder="search city" className="w-[20em] p-[5px] rounded-md outline-none border-[1px] border-black/50 relative" onChange={(e) => dispatch(typeUsersCity(e.target.value))} value={usersCity} />

          <div className="h-auto w-[20em] absolute bg-white z-10 rounded-md max-[700px]:w-40" >
            { suggestionsIsLoading ? 

              <p>Loading...</p>
              :
              suggestions?.map((element, i) => <p className="p-2 cursor-pointer hover:bg-stone-400" key={element.lat + i} onClick={() => onUpdateCity(i)} >{element.name}-{element.country}</p>)

            }
          </div>

        </div>

      </form>


      <div className="h-[85%] grid grid-cols-3 auto-rows-[4em] px-20 py-10 gap-4 border-2 border-red-500" >
        {
          userCities.map((element) => <MyCitiesItem key={element.id} element={element} /> )
        }
      </div>

    </div>
  )
}

export default MyCities;
