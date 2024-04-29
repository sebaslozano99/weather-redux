import PropTypes from "prop-types";
import { UseTempContext } from "../contexts/TempContext";
import getRigthWeatherImg from "../utilities/getRightWeatherImg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons"; 
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTemperature0 } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
};

const DetailedInfo = ({info}) => {

    const { temperatureType, theme } = UseTempContext();
    const rightTempType = temperatureType ? (info?.main?.temp - 273.15).toFixed(1) : ((info?.main?.temp - 273.15) * 9/5 + 32).toFixed(2);
    const feelsLikeRightTempType = temperatureType ? (info?.main?.feels_like - 273.15).toFixed(2) : ((info?.main?.feels_like - 273.15) * 9/5 + 32).toFixed(2);
    const maxTemp = temperatureType ? (info?.main?.temp_max - 273.15).toFixed(2) : ((info?.main?.temp_max - 273.15) * 9/5 + 32).toFixed(2);
    const minTemp = temperatureType ? (info?.main?.temp_min - 273.15).toFixed(2) : ((info?.main?.temp_min - 273.15) * 9/5 + 32).toFixed(2);
    const date = new Date();
    console.log(info);

    // function getTimeStamp(){
    //     const date = new Date(info?.sys?.sunset);
    //     const options = { hour: 'numeric', minute: 'numeric' };
    //     // return new Intl.DateTimeFormat("en, US", options).format(date);
    //     return date;
    // }

    // console.log(getTimeStamp());

  return (
    <>
        <div className="w-[30%] h-[85vh] p-2 border-2 border-green-500" >

            <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} h-3/6 rounded-2xl p-2 w-full`}>

                <div className="flex justify-between gap-2 h-[65%]"> 

                    <div className="w-[55%] flex flex-col justify-center items-start gap-2 pl-5" >
                        <h3>Now</h3>
                        <p className="text-5xl" >{rightTempType}°{temperatureType ? <span className="text-3xl">c</span> : <span className="text-3xl">f</span>}</p>
                        <p className="font-thin text-base" >{info?.weather?.at(0)?.description}</p>
                    </div>

                    <div className="w-[45%] flex justify-start items-center" >
                        <img src={getRigthWeatherImg(info?.weather?.at(0)?.icon)} alt={info?.name} className="w-[70%] h-[70%]" />
                    </div>
                </div>

                <hr className={`w-[80%] mx-auto`} />

                <div className="h-[35%] p-2 flex flex-col justify-around" >
                    <p className="text-base" >
                        <FontAwesomeIcon icon={faCalendar} className="mr-3 text-2xl" />
                        {date.toLocaleDateString("en-US", options)}
                    </p>

                    <p className="text-base" >
                        <FontAwesomeIcon icon={faMapLocationDot} className="mr-3 text-2xl" />
                        {info?.name} - {info?.sys?.country}
                    </p>
                </div>
            </div>

        </div>


        <div className="w-[70%] h-[85vh] p-2 border-2 border-red-500">
            <div className={`w-full h-[60%] rounded-2xl flex p-4`} >
                
                <div className="w-3/6 h-full grid grid-cols-2 grid-rows-2 gap-3 p-2" >

                    <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} col-start-1 col-end-3 row-span-1 row-end-2 rounded-xl p-2 flex flex-col justify-around`} >
                        <h3 className="text-xl" >Temperature</h3>

                        <div className="flex flex-wrap justify-around items-center">
                            <FontAwesomeIcon icon={faTemperature0} className="text-4xl" />

                            <div>
                                <p className="font-thin" >{feelsLikeRightTempType} {temperatureType ? "°C" : "°F"}</p>
                                <h4>Feels Like</h4>
                            </div>

                            <div>
                                <p className="font-thin" >{maxTemp} {temperatureType ? "°C" : "°F"}</p>
                                <h4>Max Temp</h4>
                            </div>

                            <div>
                                <p className="font-thin" >{minTemp} {temperatureType ? "°C" : "°F"}</p>
                                <h4>Min Temp</h4>
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




                <div className="w-3/6 h-full grid grid-cols-2 grid-rows-2 gap-3 p-2" >
                    <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} col-start-1 col-end-3 row-span-1 row-end-2 rounded-xl p-2 flex flex-col justify-around`} >
                        <h3 className="text-xl" >Sunrise & Sunset</h3>

                        <div>
                            <FontAwesomeIcon icon={faSun} className="text-2xl" />

                            <h5>Sunrise</h5>
                            <p>{}</p>
                        </div>

                    </div>

                    <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} rounded-xl p-2 flex flex-col justify-around`} >
                        <h3 className="text-xl" >Visibility</h3>

                        <div className="flex justify-between items-center text-2xl">
                            <FontAwesomeIcon icon={ faEye }  />
                            <p>{info?.visibility} m</p>
                        </div>
                    </div>

                    <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} rounded-xl p-2 flex flex-col justify-around`} >
                        <h3 className="text-xl" >Wind</h3>

                        <div className="flex justify-between items-center text-2xl">
                            <FontAwesomeIcon icon={ faWind }  />
                            <p>{info?.wind?.speed} m/s</p>
                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
      
    </>
  )
}

export default DetailedInfo;

DetailedInfo.propTypes = {
    info: PropTypes.object,
}
