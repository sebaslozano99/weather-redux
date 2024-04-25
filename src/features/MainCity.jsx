import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainCityInfo, changeCity } from "./mainCitySlice";
import { getOtherCities } from "./otherCities";
import CityCardReusable from "../ui/CityCardReusable";
import { UseTempContext } from "../contexts/TempContext";



const MainCity = () => {
  const { cityName, cityInfo, isLoading } = useSelector((store) => store.mainCity);
  const { cities, citiesInfo, isLoading: otherCitiesLoading  } = useSelector((store) => store.otherCities);
  const { theme } = UseTempContext();
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getMainCityInfo(cityName));
  }, [cityName, dispatch]);

  useEffect(() => {
    dispatch(getOtherCities(cities));
  },[cities, dispatch])


  //if CITY entered by user is a non-existing city, the API will return error code "404", in that case We'll go back to New York
  useEffect(() => {
    if(cityInfo.cod === "404"){
        dispatch(changeCity("new york"));
    }
  }, [cityInfo.cod, dispatch])




  return (
    <main className={`h-[90vh] w-full ${theme ? "bg-[#252525]" : "bg-blue-500"} transition-all ease-out duration-300 p-4 flex gap-5`} >

        <div className={`${theme ? "bg-black/30 text-white border-white/30" : "border-black/30"} border-[1px] w-[45%] h-full rounded-3xl p-2 flex flex-col justify-center gap-6 shadow-xl shadow-black/50`} >
            <CityCardReusable cityInfo={cityInfo} isLoading={isLoading} tempType="bigCardTemp" countryType="bigCityCountry" titleType="bigTitle" descType="bigDesc" spinnerType="bigSpinner" />
        </div>


        <div className="w-[55%] h-full rounded-3xl grid grid-cols-2 auto-rows-[50%] gap-[1em] overflow-y-auto p-[10px]" >
            {
              citiesInfo[0]?.map(element => <div key={element.name} className={`border-[1px] rounded-xl ${theme ? "bg-black/30 text-white border-white/30" : "border-black/30"} p-1 flex flex-col justify-center items-center gap-4 shadow-xl shadow-black/50`}>
                <CityCardReusable  isLoading={otherCitiesLoading} cityInfo={element} tempType="smallCardTemp" countryType="smallCityCountry" titleType="smallTitle" descType="smallDesc" spinnerType="smallSpinner" />
              </div>)
            }
        </div>
      
    </main>
  )
}

export default MainCity
