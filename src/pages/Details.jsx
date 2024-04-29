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


  return (
    <main className={`w-full min-h-[90vh] ${theme ? "bg-[#252525] text-white" : "bg-blue-500 text-black"} transition-all ease-in-out duration-300 p-4 flex`} >
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
