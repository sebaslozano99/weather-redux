import { Link } from "react-router-dom";
import { UseTempContext } from "../contexts/TempContext";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSunPlantWilt, faEarthAmerica, faChartLine } from "@fortawesome/free-solid-svg-icons";




const HomePage = () => {

  const { theme } = UseTempContext();


  return (
    <main className={`w-full h-auto ${theme ? "bg-[#252525]" : "bg-gradient-to-bl from-cyan-300 to-sky-600"} transition-all duration-300 `} >
        
      <div className="w-full h-[90vh] p-14 flex items-center max-[850px]:flex-col max-[850px]:h-[80vh] max-[850px]:p-6" >

        <div className="w-5/12 flex flex-col gap-6 max-[1100px]:w-4/12 max-[850px]:w-full max-[850px]:h-full max-[850px]:items-center max-[850px]:justify-center">

          <h2 className="text-white text-6xl font-extrabold max-[900px]:text-5xl" >WEATHER <br/> FORECAST</h2>

          <p className="text-white text-lg font-light tracking-wide text-balance max-[900px]:text-base max-[850px]:text-center max-[850px]:text-lg" >Welcome to <span className="font-bold" >WeatherWise,</span> the ultimate user-friendly interface and cutting-edge weather application designed to keep you informed and prepared for any   weather condition, anytime and anywhere.
          </p>

          <Link to="search">
            <button className="bg-white/60 px-4 py-2 rounded-2xl hover:bg-white transition-all duration-300 w-[10em]" >Search</button>
          </Link>

        </div>


        <div className="w-7/12 h-full relative max-[1100px]:w-8/12 max-[850px]:hidden" >

          <motion.div
          initial={{  y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5 , repeat: Infinity, delay: 0.5 }}
            className="w-[11em] absolute right-10 z-20 bottom-4 max-[1100px]:w-[9em] max-[1100px]:bottom-10 max-[850px]:bottom-0 max-[700px]:w-[8em] max-[550px]:right-0 max-[550px]:bottom-0 max-[550px]:w-[7em]"
          >
            <img src="../../public/clouds.png" />
          </motion.div>


          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 14,
              ease: 'linear',
          }}
          className="w-[25em] absolute right-5 top-8 z-10 max-[1100px]:w-[20em] max-[1100px]:top-16 max-[850px]:w-[20em] max-[850px]:top-8 max-[700px]:w-[15em] max-[700px]:top-12 max-[550px]:w-[12em] max-[550px]:top-20 max-[550px]:left-40"
          >
            <img src={ theme ? "./../public/full-moon.png" : "./../public/clearDay.png" } />
          </motion.div>

          <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
            className="w-[10em] absolute left-20 z-20 bottom-4 opacity-70 max-[1100px]:w-[8em] max-[700px]:w-[9em] max-[550px]:w-[5em] max-[550px]:left-0"
          >
            <img src="../../public/clouds.png" />
          </motion.div>


          <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
            className="w-[8em] absolute left-20 z-20 top-4 max-[1100px]:w-[6em] max-[700px]:w-[5em] max-[700px]:opacity-50"
          >
            <img src="../../public/clouds.png" />
          </motion.div>

        </div>


      </div>

      <div className="w-full h-[50vh] flex items-center justify-around gap-4 p-4 max-[850px]:flex-col max-[850px]:h-auto" >

          <div className={ `border-[1px] ${theme ? "border-white/50" : "border-black/50"}  p-4 rounded-xl flex flex-col items-center py-8 w-[33%] h-full max-[850px]:w-full` } >

            <FontAwesomeIcon icon={faSunPlantWilt} fontSize="5em" className={theme ? "text-yellow-500" : "text-blue-700"} />

            <div className="flex flex-col gap-2 mt-4">
              <h3 className={ `font-bold text-xl text-center ${theme && "text-white"}`} >Real Time Weather Updates</h3>
              <p className={`text-center ${theme && "text-white"}`} >Get the latest weather updates in real-time, ensuring you have the most accurate information at your fingertips.</p>
            </div>

          </div>

          <div className={ `border-[1px] ${theme ? "border-white/50" : "border-black/50"}  p-4 rounded-xl flex flex-col items-center py-8 w-[33%] h-full max-[850px]:w-full` } >

            <FontAwesomeIcon icon={faEarthAmerica} fontSize="5em" className={theme ? "text-yellow-500" : "text-blue-700"} />

            <div className="flex flex-col gap-2 mt-4">
              <h3 className={ `font-bold text-xl text-center ${theme && "text-white"}`} >Global Coverage</h3>
              <p className={`text-center ${theme && "text-white"}`} >Access weather information for any location worldwide, from major cities to remote areas.</p>
            </div>

          </div>

          <div className={ `border-[1px] ${theme ? "border-white/50" : "border-black/50"}  p-4 rounded-xl flex flex-col items-center py-8 w-[33%] h-full max-[850px]:w-full` } >

            <FontAwesomeIcon icon={faChartLine} fontSize="5em" className={theme ? "text-yellow-500" : "text-blue-700"} />

            <div className="flex flex-col gap-2 mt-4">
              <h3 className={ `font-bold text-xl text-center ${theme && "text-white"}`} >User-Friendly Design</h3>
              <p className={`text-center ${theme && "text-white"}`} >Enjoy a clean and intuitive interface that makes navigating through weather data effortless and enjoyable.</p>
            </div>

          </div>

      </div>

    </main>
  )
}

export default HomePage
