import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseTempContext } from "../../contexts/TempContext";
import { getMainCityInfo } from "./mainCitySlice";
import { add } from "../otherCities/otherCities";
import CityCardReusable from "../../ui/CityCardReusable";
import OtherCitiesUi from "../otherCities/OtherCitiesUi";


const MainCity = () => {
  // const [usersPos, setUsersPos] = useState({lat: null, lon: null});
  const { cityName, countryCode, cityInfo, isLoading } = useSelector((store) => store.mainCity);
  const { cities } = useSelector((store) => store.otherCities);
  const { theme } = UseTempContext();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getMainCityInfo({cityName, countryCode}));
  }, [dispatch, cityName, countryCode]);



  // useEffect(() => {
  //   function success(position){
  //     setUsersPos({lat: position.coords.latitude, lon: position.coords.longitude});
  //   }

  //   function error(err) {
  //     throw new Error(err);
  //   }

  //   navigator.geolocation.getCurrentPosition(success, error);

  // }, [])


  // useEffect(() => {
  //   async function getCity(){
  //     try{
  //       const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${usersPos.lat}&lon=${usersPos.lon}&limit=5&appid=777755690ecb518be7c3410d5ae34b00`);
  //       const data = await res.json();
  //       console.log(data);
  //     }
  //     catch(err){
  //       throw new Error(err);
  //     }
  //   }

  //   if(usersPos.lat && usersPos.lon){
  //     getCity()
  //   }

  // }, [usersPos.lat, usersPos.lon])





  function handleAddToList(){
    if(!cities.some(element => element.name === cityInfo?.name.toLowerCase() && element.countryCode === cityInfo?.sys?.country)){
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
