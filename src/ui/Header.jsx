import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeCity } from "../features/mainCitySlice";
import { UseTempContext } from "../contexts/TempContext";
import { UseSuggestions } from "../contexts/SuggestionsContext";


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  // const [city, setCity] = useState("");
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const { onChangeTempType, temperatureType, onChangeTheme, theme } = UseTempContext();
  const { suggestions, setSuggestions, usersCity, setUsersCity } = UseSuggestions();
  const dispatch = useDispatch();


  console.log(suggestions, usersCity)


  function onSubmit(e){
    e.preventDefault();
    if(!usersCity) return;
    dispatch(changeCity(usersCity));
    setUsersCity("");
    setSuggestions([]);
  }

  function onClickChangeCity(){
    if(!usersCity) return;
    dispatch(changeCity(usersCity));
    setUsersCity("");
    setSuggestions([]);
  }

  function handleOpenBurger(){
    setIsOpen(!isOpen);
  }




  return (
    <header  className={`h-[10vh] w-full flex justify-between items-center px-12 relative ${theme ? "bg-[#252525]" : "bg-blue-500"} transition-all ease-in-out duration-300`}>

      <div className="flex items-center gap-10">

        <div className="cursor-pointer" onClick={handleOpenBurger} >

          <span className={`block w-[25px] h-[2px] my-[5px] transition-all ease-in-out duration-300 ${isOpen && "rotate-[45deg] translate-y-[7px]"} ${theme ? "bg-white" : "bg-black"}`}></span>

          <span className={`block w-[25px] h-[2px] my-[5px] ${isOpen ? "opacity-0" : ""} transition-all ease-in-out duration-300 ${theme ? "bg-white" : "bg-black"}`}></span>

          <span className={`block w-[25px] h-[2px] my-[5px] transition-all ease-in-out duration-300 ${isOpen && "rotate-[-45deg] translate-y-[-7px]"} ${theme ? "bg-white" : "bg-black"}`}></span>

        </div>


        <div className={`bg-black w-[8em] h-auto py-4 px-2 rounded-xl absolute top-[10vh] z-10 flex flex-col items-center gap-2 shadow-md shadow-black transition-all ease-in-out duration-300 ${isOpen ? "left-0" : "left-[-100%]"}`} >

          <button className="bg-white w-[80%] rounded-xl" onClick={onChangeTheme} >{theme ? "light" : "dark"}</button>
          <button className="bg-white w-[80%] rounded-xl" onClick={onChangeTempType} >{temperatureType ? "°F" : "°C"}</button>

        </div>



        <h1 className={`text-3xl font-bold ${theme ? "text-white" : "text-black"}`} >
          <Link  to="/" onClick={() => setDisplaySearchBar(false)} >I&apos;m Weather</Link>
        </h1>
      </div>

    {displaySearchBar &&  <form className="flex gap-2" onSubmit={(e) => onSubmit(e)} >

        <div >

          <input type="text" placeholder="gatlinburg"  className="w-[20em] p-[5px] rounded-md outline-none relative border-[1px] border-black/50" value={usersCity} onChange={(e) => setUsersCity(e.target.value)} />

          <div className="h-auto absolute w-[20em] bg-white z-10 rounded-md" >
            {
              suggestions.map(element => <p className="p-2 cursor-pointer hover:bg-stone-400" key={element.lat} onClick={onClickChangeCity} >{element.name}-{element.country}</p>)
            }
          </div>

        </div>
        <button className="bg-white px-[15px] py-[2px] rounded-md" >Search</button>
      </form>
    }

      <nav>
        <ul  className={`flex gap-6 ${theme ? "text-white" : "text-black"}`}>
            <li>
                <Link to="search" onClick={() => setDisplaySearchBar(true)} >Search</Link>
            </li>
            <li>
                <Link to="account" onClick={() => setDisplaySearchBar(false)} >Account</Link>
            </li>
            <li>
                <Link to="about" onClick={() => setDisplaySearchBar(false)} >About</Link>
            </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
