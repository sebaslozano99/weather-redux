import PropTypes from "prop-types";
import { UseTempContext } from "../contexts/TempContext";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import getRightImageBasedCode from "../utilities/getRightWeatherImg";


const styles = {
    bigCardTemp: "text-[3em] text-center font-semibold max-[1000px]:text-[2.5em] max-[800px]:text-[3em] max-[520px]:text-[2em]",
    smallCardTemp: "text-[1.4em] text-center font-semibold",
    bigCityCountry: "text-5xl text-center font-thin mb-4 max-[1000px]:text-4xl max-[800px]:text-5xl max-[520px]:text-3xl",
    smallCityCountry: "text-xl text-center font-thin mb-4",
    bigTitle: "text-center font-semibold text-2xl max-[1000px]:text-xl max-[800px]:text-2xl max-[520px]:text-lg",
    smallTitle: "text-center font-semibold text-mds",
    bigDesc: "text-center text-xl font-thin max-[1000px]:text-lg max-[800px]:text-xl max-[520px]:text-base",
    smallDesc: "text-center text-sm font-thin",
  }


const CityCardReusable = ({cityInfo, isLoading, tempType, countryType, titleType, descType, spinnerType, addBtn = false, handleAddToList}) => {

  const { temperatureType, theme } = UseTempContext();
  const rightTempType = temperatureType ? (cityInfo?.main?.temp - 273.15).toFixed(2) : ((cityInfo?.main?.temp - 273.15) * 9/5 + 32).toFixed(2);
  const feelsLikeRightTempType = temperatureType ? (cityInfo?.main?.feels_like - 273.15).toFixed(2) : ((cityInfo?.main?.feels_like - 273.15) * 9/5 + 32).toFixed(2);

  return (
    < >
        { 

        isLoading ? 
            <Spinner spinnerType={spinnerType} />

        :

        <>
       { addBtn && <button className={`${theme ? "bg-white text-black" : "bg-[#252525] text-white"} w-6 h-6 rounded-[50%] absolute top-0 right-0 m-2 opacity-50 hover:opacity-100 transition-opacity ease-in duration-300`}  onClick={handleAddToList} >+</button>}

            <div className="w-full h-[40%] flex">

                <div className="w-[40%] flex items-center justify-center p-2">
                    <img src={getRightImageBasedCode(cityInfo?.weather?.at(0)?.icon)} className="max-[800px]:w-[80%] max-[701px]:w-[70%] max-[520px]:w-[100%]" />
                </div>

                <div className="w-[60%] flex flex-col items-center justify-center">
                    <h2>
                        <Link to={`${cityInfo?.id}`} className={styles[countryType]} >{cityInfo?.name} - {cityInfo?.sys?.country}</Link>
                    </h2>
                    <p className={styles[tempType]} >{rightTempType} {temperatureType ? "°C" : "°F"}</p>
                </div>
            </div>


            <div className="flex gap-6 justify-around items-center flex-wrap" >
                <div>
                    <h3 className={styles[descType]} >{cityInfo?.weather?.at(0)?.main}</h3>
                    <p className={styles[titleType]} >Weather</p>
                </div>
                <div>
                    <h3 className={styles[descType]} >{cityInfo?.weather?.at(0)?.description}</h3>
                    <p className={styles[titleType]} >Description</p>
                </div>
                <div>
                    <h3 className={styles[descType]} >{feelsLikeRightTempType} {tempType ? "°C" : "°F"}</h3>
                    <p className={styles[titleType]} >Feels Like</p>
                </div>
                <div>
                    <h3 className={styles[descType]} >{cityInfo?.main?.humidity}%</h3>
                    <p className={styles[titleType]} >Humidity</p>
                </div>
            </div>
        </>
        }
    </>
    
  )
}

export default CityCardReusable;

CityCardReusable.propTypes = {
    cityInfo: PropTypes.object,
    isLoading: PropTypes.bool,
    tempType: PropTypes.string,
    countryType: PropTypes.string,
    titleType: PropTypes.string,
    descType: PropTypes.string,
    spinnerType: PropTypes.string,
    addBtn: PropTypes.bool,
    handleAddToList: PropTypes.func,
}
