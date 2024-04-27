import PropTypes from "prop-types";
import { UseTempContext } from "../contexts/TempContext";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../features/otherCities";


const shortCut = "../public/";
const weatherCodes = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n", "50d", "50n"];

const imagesCodes = [`${shortCut}clearDay.png`, `${shortCut}clearNight.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}thunderStorm.png`, `${shortCut}thunderStorm.png`, `${shortCut}snow.png`, `${shortCut}snow.png`, `${shortCut}hazeDay.png`, `${shortCut}hazeNight.png`];

const styles = {
    bigCardTemp: "text-[3em] text-center font-semibold",
    smallCardTemp: "text-[1.4em] text-center font-semibold",
    bigCityCountry: "text-5xl text-center font-thin mb-4",
    smallCityCountry: "text-xl text-center font-thin mb-4",
    bigTitle: "text-center font-semibold text-2xl",
    smallTitle: "text-center font-semibold text-mds",
    bigDesc: "text-center text-xl font-thin",
    smallDesc: "text-center text-sm font-thin",
  }


function getRightImageBasedCode(codeId, codesArray, imagesArray){
    let rightIndex;

    for(let i = 0; i < codesArray.length; i++){
        if(codesArray[i] === codeId){
            rightIndex = i;
        }
    }
    return imagesArray[rightIndex];

}

const CityCardReusable = ({cityInfo, isLoading, tempType, countryType, titleType, descType, spinnerType, addBtn = false}) => {



  const { temperatureType, theme } = UseTempContext();
  const otherCities = useSelector((store) => store.otherCities);
  const rightTempType = temperatureType ? (cityInfo?.main?.temp - 273.15).toFixed(2) : ((cityInfo?.main?.temp - 273.15) * 9/5 + 32).toFixed(2);
  const dispatch = useDispatch();

  function handleAddToList(){
    if(!otherCities.cities.includes(cityInfo.name)){
        dispatch(add(cityInfo.name));
    }
    else{
        alert(`${cityInfo.name} is already in your list!`);
    }
  }


  return (
    < >
        { 

        isLoading ? 
            <Spinner spinnerType={spinnerType} />

        :

        <>
       { addBtn && <button className={`${theme ? "bg-white text-black" : "bg-[#252525] text-white"} w-6 h-6 rounded-[50%] absolute top-0 right-0 m-2 opacity-50 hover:opacity-100 transition-opacity ease-in duration-300`}  onClick={handleAddToList} >+</button>}

            <div className="w-full h-[40%] flex">

                <div className="w-[40%] flex items-center justify-center p-4">
                    <img src={getRightImageBasedCode(cityInfo?.weather?.at(0)?.icon, weatherCodes, imagesCodes)} />
                </div>

                <div className="w-[60%] flex flex-col items-center justify-center">
                    <h2 className={styles[countryType]} >{cityInfo?.name} - {cityInfo?.sys?.country}</h2>
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
                    <h3 className={styles[descType]} >{(cityInfo?.main?.feels_like - 273.15).toFixed(2)}°C</h3>
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
}
