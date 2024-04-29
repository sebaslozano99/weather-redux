import { useEffect } from "react";
import { UseTempContext } from "../contexts/TempContext";
import { useDispatch, useSelector } from "react-redux";
import { getOtherCities } from "./otherCities";
import CityCardReusable from "../ui/CityCardReusable";




const OtherCitiesUi = () => {

    const { cities, citiesInfo, isLoading: otherCitiesLoading  } = useSelector((store) => store.otherCities);
    const { theme } = UseTempContext();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOtherCities(cities));
    },[cities, dispatch]);


  return (
    <div className="w-[55%] h-full rounded-3xl grid grid-cols-2 auto-rows-[50%] gap-[1em] overflow-y-auto p-[10px]" >

        {
          citiesInfo?.map(element => <div key={element.id} className={`border-[1px] rounded-xl ${theme ? "bg-black/30 text-white border-white/30" : "border-black/30"} p-1 flex flex-col justify-center items-center gap-4 shadow-xl shadow-black/10`}>

            <CityCardReusable  isLoading={otherCitiesLoading} cityInfo={element} tempType="smallCardTemp" countryType="smallCityCountry" titleType="smallTitle" descType="smallDesc" spinnerType="smallSpinner" />
            
          </div>)
        }
    </div>
  )
}

export default OtherCitiesUi