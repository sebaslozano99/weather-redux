import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperature0, faDroplet, faWater } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";




const TempHumidPress = ({theme, feelsLikeRightTempType, temperatureType, maxTemp, info, minTemp}) => {
  return (
    <>
        <div className="w-3/6 h-full grid grid-cols-2 grid-rows-2 gap-3 p-2 max-[950px]:w-full" >

            <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} col-start-1 col-end-3 row-span-1 row-end-2 rounded-xl p-2 flex flex-col justify-around`} >
                <h3 className="text-xl" >Temperature</h3>

                <div className="flex flex-wrap justify-around items-center">
                    <FontAwesomeIcon icon={faTemperature0} className="text-4xl" />

                    <div>
                        <p className="text-base font-thin" >{feelsLikeRightTempType} {temperatureType ? "°C" : "°F"}</p>
                        <h4 className="text-lg">Feels Like</h4>
                    </div>

                    <div>
                        <p className="text-base font-thin" >{maxTemp} {temperatureType ? "°C" : "°F"}</p>
                        <h4 className="text-lg">Max Temp</h4>
                    </div>

                    <div>
                        <p className="text-base font-thin" >{minTemp} {temperatureType ? "°C" : "°F"}</p>
                        <h4 className="text-lg">Min Temp</h4>
                    </div>
                </div>
            </div>

            <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} rounded-xl p-2 flex flex-col justify-center gap-3`} >
                <h3 className="text-xl" >Humidity</h3>
                <div className="flex justify-between items-center text-2xl" >
                    <FontAwesomeIcon icon={faDroplet} />
                    <p>{info?.main?.humidity}%</p>
                </div>
            </div>

            <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} rounded-xl p-2 flex flex-col justify-center gap-3`} >
                <h3 className="text-xl" >Pressure</h3>
                <div className="flex justify-between items-center text-2xl" >
                    <FontAwesomeIcon icon={faWater} />
                    <p>{info?.main?.pressure}hPa</p>
                </div>
            </div>

        </div>
    </>
  )
}

export default TempHumidPress;

TempHumidPress.propTypes = {
    theme: PropTypes.bool,
    temperatureType: PropTypes.bool,
    feelsLikeRightTempType: PropTypes.number,
    maxTemp: PropTypes.number,
    minTemp: PropTypes.number,
    info: PropTypes.object,
}

