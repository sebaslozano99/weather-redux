import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainCityInfo } from "./mainCitySlice";
import { changeCity } from "./mainCitySlice";



const shortCut = "../public/";
const weatherCodes = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n", "50d", "50n"];

const imagesCodes = [`${shortCut}clearDay.png`, `${shortCut}clearNight.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}thunderStorm.png`, `${shortCut}thunderStorm.png`, `${shortCut}snow.png`, `${shortCut}snow.png`, `${shortCut}hazeDay.png`, `${shortCut}hazeNight.png`];


function getRightImageBasedCode(codeId, codesArray, imagesArray){
    let rightIndex;

    for(let i = 0; i < codesArray.length; i++){
        if(codesArray[i] === codeId){
            rightIndex = i;
        }
    }
    return imagesArray[rightIndex];

}



const MainCity = () => {

  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { cityName, cityInfo, isLoading } = useSelector((store) => store.mainCity);

  function onChangeCity(){
    dispatch(changeCity(city));
    setCity("");
  }

  useEffect(() => {
    dispatch(getMainCityInfo(cityName))
  }, [cityName, dispatch])



  return (
    <main className="min-h-[90vh] w-full bg-blue-500 grid place-items-center" >

        <input type="text" placeholder="moscow" className="p-2 rounded-lg" value={city} onChange={(e) => setCity(e.target.value)} />
        <button className="bg-white p-[5px] w-24" onClick={onChangeCity} >Search</button>

        <div className="bg-white w-[500px] h-[500px] rounded-3xl p-2 flex flex-col justify-center gap-6" >
            {
                isLoading ? 
                <div className="w-full h-screen grid place-items-center" >
                 <div className="border-8 border-yellow-600 border-x-transparent w-[300px] h-[300px] rounded-[50%] animate-spin" ></div>
                </div>

                :

                <>
                    <div className="border-2 border-red-500 w-full h-[40%] flex">
                        <div className="w-[40%] border-2 border-orange-500 flex items-center justify-center p-4">
                            <img src={getRightImageBasedCode(cityInfo?.weather?.at(0)?.icon, weatherCodes, imagesCodes)} />
                        </div>

                        <div className="border-2 border-green-400 w-[60%] flex flex-col items-center justify-center">
                            <h2 className="text-4xl text-center font-thin" >{cityInfo?.name} - {cityInfo?.sys?.country}</h2>
                            <p className="text-7xl text-center font-bold" >{(cityInfo?.main?.temp - 273.15).toFixed(2)}°C</p>
                        </div>
                    </div>


                    <div className="border-2 border-red-500 flex gap-6 justify-around items-center" >
                        <div>
                            <h3 className="text-center font-thin">{cityInfo?.weather?.at(0)?.main}</h3>
                            <p className="text-center font-bold text-xl">Weather</p>
                        </div>
                        <div>
                            <h3 className="text-center font-thin">{cityInfo?.weather?.at(0)?.description}</h3>
                            <p className="text-center font-bold text-xl">Description</p>
                        </div>
                        <div>
                            <h3 className="text-center font-thin">{(cityInfo?.main?.feels_like - 273.15).toFixed(2)}°C</h3>
                            <p className="text-center font-bold text-xl">Feels Like</p>
                        </div>
                        <div>
                            <h3 className="text-center font-thin">{cityInfo?.main?.humidity}%</h3>
                            <p className="text-center font-bold text-xl">Humidity</p>
                        </div>
                    </div>
                </>
            }
        </div>
      
    </main>
  )
}

export default MainCity
