import PropTypes from "prop-types";
import { UseTempContext } from "../contexts/TempContext";
import TempHumidPress from "./TempHumidPress";
import SunriseVisibilityWind from "./SunriseVisibilityWind";
import LocationAndIcon from "./LocationAndIcon";
import FourDaysWeatherContainer from "./FourDaysWeatherContainer";





//I GOT THIS FUNCTION FROM CHATGPT
function unixTimestampToTime(unixTimestamp) {
    // Create a new Date object using the Unix timestamp (multiply by 1000 to convert seconds to milliseconds)
    const date = new Date(unixTimestamp * 1000);
    
    // Get hours, minutes, and seconds from the Date object
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure two-digit format
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');
    
    // Format the time as HH:MM:SS
    // return `${hours}:${minutes}:${seconds}`;
    return `${hours}:${minutes} ${hours > 11 ? "PM" : "AM"}`;
  }





const DetailedInfo = ({info}) => {

    const { temperatureType, theme } = UseTempContext();

    const rightTempType = temperatureType ? (info?.main?.temp - 273.15).toFixed(1) : ((info?.main?.temp - 273.15) * 9/5 + 32).toFixed(2);
    const feelsLikeRightTempType = temperatureType ? (info?.main?.feels_like - 273.15).toFixed(2) : ((info?.main?.feels_like - 273.15) * 9/5 + 32).toFixed(2);

    const maxTemp = temperatureType ? (info?.main?.temp_max - 273.15).toFixed(2) : ((info?.main?.temp_max - 273.15) * 9/5 + 32).toFixed(2);
    const minTemp = temperatureType ? (info?.main?.temp_min - 273.15).toFixed(2) : ((info?.main?.temp_min - 273.15) * 9/5 + 32).toFixed(2);

    const sunrise = unixTimestampToTime(info?.sys?.sunrise);
    const sunset = unixTimestampToTime(info?.sys?.sunset);


  return (
    <>
      {/* <div className="border-2 border-green-500 flex w-full h-[60%]"> */}
      <div className="mb-4 flex w-full h-[50vh] max-[950px]:h-auto max-[750px]:flex-col max-[750px]:h-auto">
        

        <LocationAndIcon theme={theme} rightTempType={Number(rightTempType)} info={info} temperatureType={temperatureType} />


        <div className="w-full h-full p-2 flex max-[950px]:flex-col max-[950px]:h-auto">

            <TempHumidPress theme={theme} feelsLikeRightTempType={Number(feelsLikeRightTempType)} temperatureType={temperatureType} maxTemp={Number(maxTemp)} info={info} minTemp={Number(minTemp)}  />

            <SunriseVisibilityWind theme={theme} info={info} sunrise={sunrise} sunset={sunset} />

        </div>
      
      </div>


      <FourDaysWeatherContainer info={info} />

    </>
  )
}

export default DetailedInfo;

DetailedInfo.propTypes = {
    info: PropTypes.object,
}
