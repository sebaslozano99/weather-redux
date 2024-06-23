import { useEffect } from "react";
import { UseTempContext } from "../../contexts/TempContext";
import { useDispatch, useSelector } from "react-redux";
import { getOtherCities } from "./otherCities";
import CityCardReusable from "../../ui/CityCardReusable";
import { UseUserCitiesContext } from "../../contexts/CitiesContext";
import { UseAuthContext } from "../../contexts/AuthContext";
import Spinner from "../../ui/Spinner";
import image from "../../../public/empty.svg";



const OtherCitiesUi = () => {

    const { cities, citiesInfo, isLoading: otherCitiesLoading  } = useSelector((store) => store.otherCities); // default cities
    const { userCities, userCitiesInfo, userIsLoading }  = UseUserCitiesContext(); // once there is a user logged in, we'll get the cities names and cities country codes that the user has saved in his list
    const { user } = UseAuthContext();
    const { theme } = UseTempContext();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getOtherCities(cities));
    },[cities, dispatch]);


    useEffect(() => {
      console.log(userCities);
    }, [userCities])


  if(!userCitiesInfo.length && user) return (
    <div className={`border-[1px] ${theme ? "border-white/30 bg-black/30" : "border-black/30"} w-[55%] rounded-3xl flex flex-col justify-center items-center max-[800px]:w-full max-[800px]:h-screen max-[450px]:h-[30em]`} >

      <img src={image} alt="image" className="w-6/12 max-[600px]:w-[80%]" />
      <p className={`${theme ? "text-white" : "text-black"} text-xl`} >Start adding Cities to your list!</p>

    </div>
  )

  return (
    <div className="w-[55%] h-full rounded-3xl grid grid-cols-2 auto-rows-[50%] gap-[1em] overflow-y-auto p-[10px] max-[1000px]:grid-cols-1 max-[1000px]:w-[45%] max-[800px]:w-full max-[800px]:grid max-[800px]:grid-cols-auto max-[800px]:grid-rows-[300px] max-[800px]:max-h-[90vh] max-[800px]:auto-rows-[300px] scrollbar" >

      {
        //if there is no user signed in, We still will show some default cities provided by the application
        !user ?

        <>
        {
          citiesInfo?.map(element => <div key={element.id} className={`border-[1px] rounded-xl ${theme ? "bg-black/30 text-white border-white/30" : "border-black/30"} p-1 flex flex-col justify-center items-center gap-4 shadow-xl shadow-black/10`}>

            <CityCardReusable  isLoading={otherCitiesLoading} cityInfo={element} tempType="smallCardTemp" countryType="smallCityCountry" titleType="smallTitle" descType="smallDesc" spinnerType="smallSpinner" />
            
          </div>)
        }
        </>

        :

        //I need to improve the fetching data visualization with a spinner at the first render when the software is fetching the data from the DB. 
        <>
          {!userIsLoading ?

            userCitiesInfo.map((element) => <div key={element.id} className={`border-[1px] rounded-xl ${theme ? "bg-black/30 text-white border-white/30" : "border-black/30"} p-1 flex flex-col justify-center items-center gap-4 shadow-xl shadow-black/10`}>

            <CityCardReusable  isLoading={userIsLoading} cityInfo={element} tempType="smallCardTemp" countryType="smallCityCountry" titleType="smallTitle" descType="smallDesc" spinnerType="smallSpinner" />
            
          </div>)

          :
            userCitiesInfo.map(element => <div key={element.id} className={`border-[1px] rounded-xl ${theme ? "bg-black/30 text-white border-white/30" : "border-black/30"} p-1 flex flex-col justify-center items-center gap-4 shadow-xl shadow-black/10`}>
            <Spinner spinnerType="smallSpinner" />
          </div>)
          }

        </>
      }
    </div>
  )
}

export default OtherCitiesUi
