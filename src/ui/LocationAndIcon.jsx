import getRigthWeatherImg from "../utilities/getRightWeatherImg";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons"; 
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";



let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
};

const LocationAndIcon = ({theme, rightTempType, info, temperatureType}) => {
    const date = new Date();


  return (
    <div className="min-w-[400px] p-2 flex justify-center items-center max-[1050px]:min-w-[300px]" >

        <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} h-[90%] rounded-2xl p-2 w-full`}>

                <div className="flex justify-between items-center gap-2 h-[65%]"> 

                    <div className="w-[55%] flex flex-col justify-center items-start gap-2 pl-5" >
                        <h3 className="max-[950px]:text-2xl" >Now</h3>
                        <p className="text-5xl max-[950px]:text-6xl" >{rightTempType}°{temperatureType ? <span className="text-3xl">c</span> : <span className="text-3xl">f</span>}</p>
                        <p className="font-thin text-base text-center max-[950px]:text-lg" >{info?.weather?.at(0)?.description}</p>
                    </div>

                    <div className="w-[45%] h-[80%] flex justify-center items-center" >
                        <img src={getRigthWeatherImg(info?.weather?.at(0)?.icon)} alt={info?.name} className="w-[70%] h-[70%] object-contain max-[950px]:w-[90%]" />
                    </div>
                </div>

                <hr className={`w-[80%] mx-auto`} />

                <div className="h-[35%] px-2 py-4 flex flex-col gap-2 justify-around" >
                    <p className="text-base max-[950px]:text-lg" >
                        <FontAwesomeIcon icon={faCalendar} className="mr-3 text-2xl" />
                        {date.toLocaleDateString("en-US", options)}
                    </p>

                    <p className="text-base max-[950px]:text-lg" >
                        <FontAwesomeIcon icon={faMapLocationDot} className="mr-3 text-2xl" />
                        {info?.name} - {info?.sys?.country}
                    </p>
                </div>
            </div>

        </div>
  )
}

export default LocationAndIcon;

LocationAndIcon.propTypes = {
    theme: PropTypes.bool,
    temperatureType: PropTypes.bool,
    rightTempType: PropTypes.number,
    info: PropTypes.object
}
