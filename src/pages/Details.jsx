import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { UseTempContext } from "../contexts/TempContext";
import DetailedInfo from "../ui/DetailedInfo";




const Details = () => {

  const { id } = useParams();
  const { citiesInfo } = useSelector((store) => store.otherCities);
  const { cityInfo } = useSelector((store) => store.mainCity);
  const rightCityInfo = citiesInfo?.find(element => element.id === Number(id));
  const { theme } = UseTempContext();



//if user clicks on the big city's weather card, then we'll use the data we already had in the mainCity slice -- otherwise we'll need to find the right city in list of cities 
  return (
    <main className={`w-full h-auto ${theme ? "bg-[#252525] text-white" : "bg-blue-500 text-black"} transition-all ease-in-out duration-300 p-4`} >
        {
          rightCityInfo ?

              <DetailedInfo info={rightCityInfo} />
          :

              <DetailedInfo info={cityInfo} />
        }
    </main>
  )
}

export default Details
