import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFourDaysWwatherForecast } from "../features/fourWeatherForecast";
import PropTypes from "prop-types";
import FourDaysWeatherCard from "./FourDaysWeatherCard";
import FourDaysWeatherCardLoading from "./FourDaysWeatherCardLoading";






const FourDaysWeatherContainer = ({info}) => {

  const { fourDaysForecast, fourWeatherForecastIsLoading } = useSelector((store) => store.fourDaysWeather);
  const fourDaysWeatherToDisplay = fourDaysForecast?.list?.filter((element, i) => i === 7 || i === 16 || i === 24  || i === 32 && element) ;
  const dispatch = useDispatch();
  const alsas = [4585, 1254, 6987, 2014];


    
    
  useEffect(() => {
    dispatch(getFourDaysWwatherForecast({lat: info?.coord?.lat, lon: info?.coord?.lon}));
  }, [dispatch, info?.coord?.lat, info?.coord?.lon])


  return (
    <div className="w-auto h-[40vh] flex gap-2 overflow-y-hidden overflow-x-auto scrollbar p-2">
      {
        !fourWeatherForecastIsLoading ? fourDaysWeatherToDisplay?.map((element, i) => <FourDaysWeatherCard element={element} key={i} />)
        :
        alsas.map(element => <FourDaysWeatherCardLoading key={element} />)
      }
    </div>
  )
}

export default FourDaysWeatherContainer;

FourDaysWeatherContainer.propTypes = {
    info: PropTypes.object,
}
