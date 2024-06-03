import PropTypes from "prop-types";
import getRightImageBasedCode from "../utilities/getRightWeatherImg";
import { UseTempContext } from "../contexts/TempContext";




let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
};

const FourDaysWeatherCard = ({element}) => {

    const { temperatureType, theme } = UseTempContext();

    const rightTempType = temperatureType ? (element?.main?.temp - 273.15).toFixed(1) : ((element?.main?.temp - 273.15) * 9/5 + 32).toFixed(1);
    const dayDate = element?.dt_txt;
    const date = new Date(dayDate.slice(0, 4), dayDate.slice(5,7) - 1, dayDate.slice(8,10));



  return (
    <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} w-[400px] h-full shrink-0 flex rounded-2xl max-[470px]:w-[300px]`} >

        <div className="w-[40%]  flex items-center justify-center">
            <img src={getRightImageBasedCode(element?.weather?.at(0)?.icon)} alt={element?.weather?.at(0)?.icon} className="flex w-[80%] object-contain" />
        </div>

        <div className="w-[60%] flex flex-col items-center justify-center gap-4">
            <h3 className="text-center text-lg  font-thin max-[470px]:text-base">{date.toLocaleDateString("en-US", options)}</h3>

            <div className="flex flex-col items-center gap-4">
                <h2 className="text-6xl max-[470px]:text-5xl">{rightTempType} °{temperatureType ? "C" : "F"}</h2>
                <p className="text-xl font-normal max-[470px]:text-base">{element?.weather?.at(0)?.description}</p>
            </div>

        </div>

    </div>
  )
}

export default FourDaysWeatherCard;

FourDaysWeatherCard.propTypes = {
    element: PropTypes.object,
}
