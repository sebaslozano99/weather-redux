import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseTempContext } from "../contexts/TempContext";
import { getMainCityInfo } from "./mainCitySlice";
import { add } from "./otherCities";
import CityCardReusable from "../ui/CityCardReusable";
import OtherCitiesUi from "./OtherCitiesUi";


const MainCity = () => {
  const { cityName, countryCode, cityInfo, isLoading } = useSelector((store) => store.mainCity);
  const { cities } = useSelector((store) => store.otherCities);
  const { theme } = UseTempContext();
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(getMainCityInfo({cityName, countryCode}));
  }, [dispatch, cityName, countryCode ]);



  function handleAddToList(){
    if(!cities.some(element => element.name === cityInfo?.name.toLowerCase()) && !cities.some(element => element.countryCode === cityInfo?.sys?.countryCode)){
        dispatch(add({name: cityInfo?.name?.toLowerCase(), countryCode: cityInfo?.sys.country}));
    }
    else{
        alert(`city ${cityInfo?.name} - ${cityInfo?.sys.country} is already in your list!`);
    }
  }



  return (
    <>

      <div className={`${theme ? "bg-black/30 text-white border-white/30" : "border-black/30"} border-[1px] w-[45%] h-full rounded-3xl p-2 flex flex-col justify-center gap-6 shadow-md shadow-black/20 relative max-[1000px]:w-[55%] max-[800px]:w-full max-[800px]:h-[80vh] max-[520px]:h-[350px]`} >

          <CityCardReusable cityInfo={cityInfo} isLoading={isLoading} tempType="bigCardTemp" countryType="bigCityCountry" titleType="bigTitle" descType="bigDesc" spinnerType="bigSpinner" addBtn={true} handleAddToList={handleAddToList}   />

      </div>

      <OtherCitiesUi />

    </>
  )
}

export default MainCity
