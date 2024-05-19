import { UseTempContext } from "../contexts/TempContext"



const FourDaysWeatherCardLoading = () => {

  const { theme } = UseTempContext();

  return (
    <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} w-[400px] h-full shrink-0 flex rounded-2xl max-[470px]:w-[300px] animate-pulse`} >
    </div>
  )
}

export default FourDaysWeatherCardLoading
