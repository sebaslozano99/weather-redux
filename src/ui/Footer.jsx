import { UseTempContext } from "../contexts/TempContext";



const Footer = () => {

    const date = new Date();
    const { theme } = UseTempContext();

  return (
    <footer className={`${theme ? "bg-[#252525] text-white" : "bg-blue-500 text-black"} w-full h-16 flex items-center justify-center`} >
        <p className="font-thin"> 
            CopyRight {date.getFullYear()}.
            <em className="font-medium"> Powered by OpenWeather</em>
        </p>
    </footer>
  )
}

export default Footer
