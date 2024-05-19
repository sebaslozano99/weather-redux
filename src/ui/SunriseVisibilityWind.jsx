import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faEye, faMoon } from "@fortawesome/free-regular-svg-icons"; 
import { faWind } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";





const SunriseVisibilityWind = ({theme, sunrise, sunset, info}) => {
  return (
    <div className="w-3/6 h-full grid grid-cols-2 grid-rows-2 gap-3 p-2 max-[950px]:w-full" >

        <div className={`${theme ? "bg-[#3d3d3d]" : "bg-blue-600"} col-start-1 col-end-3 row-span-1 row-end-2 rounded-xl p-2 flex flex-col justify-around`} >

            <h3 className="text-xl" >Sunrise & Sunset</h3>

            <div className="flex">

                <div className="w-3/6 flex">

                    <div className="w-[40%] flex justify-center items-center">
                        <FontAwesomeIcon icon={faSun} className="text-[3vw] max-[850px]:text-[5vw] max-[550px]:text-[7vw]" />
                    </div>

                    <div className="w-[60%] flex flex-col justify-center items-start">
                        <h5 className="font-thin text-normal">Sunrise</h5>
                        <p className="text-lg">{sunrise}</p>
                    </div>
                </div>

                <div className="w-3/6 flex">

                    <div className="w-[40%] flex justify-center items-center">
                        <FontAwesomeIcon icon={faMoon} className="text-[3vw] max-[850px]:text-[5vw] max-[550px]:text-[7vw]" />
                    </div>

                    <div className="w-[60%] flex flex-col justify-center items-start">
                        <h5 className="font-thin text-normal">Sunset</h5>
                        <p className="text-lg">{sunset}</p>
                    </div>
                </div>

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
)
}

export default SunriseVisibilityWind;

SunriseVisibilityWind.propTypes = {
    theme: PropTypes.bool,
    info: PropTypes.object,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
}
