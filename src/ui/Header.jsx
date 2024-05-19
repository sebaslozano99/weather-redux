import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeCity } from "../features/mainCity/mainCitySlice";
import { UseTempContext } from "../contexts/TempContext";
import { getSuggestions } from "../features/suggestionsSlice";
import { emptySuggestions, emptyUsersCity, typeUsersCity } from "../features/suggestionsSlice";
// import { UseSuggestions } from "../contexts/SuggestionsContext";


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const { onChangeTempType, temperatureType, onChangeTheme, theme } = UseTempContext();
  const { suggestions, suggestionsIsLoading, usersCity } = useSelector((store) => store.suggestions);
  const dispatch = useDispatch();
  // const { suggestions, suggestionLoading, setSuggestions, usersCity, setUsersCity } = UseSuggestions(); --- I firstly build the suggestions/geocoding using useContext, but then replaced it with Redux to reinforce knowledge


  useEffect(() => {
    const promise = dispatch(getSuggestions(usersCity));

    // return an anonymous function to cancel thunk and multiple requests as the user types
    return () => {
      promise.abort();
    }
  }, [dispatch, usersCity])
  

  function onClickChangeCity(index){
    if(!usersCity) return; //if nothing on navBar, this does not work

    //otherwise, since the city the user is searching might have the same name as others in different countries, he'll be able to click the right one -- to accomplish it, we'll save the cityName and countryCode from the array in the right position
    const rightCityName = suggestions?.at(index)?.name;
    const rightCountry = suggestions?.at(index)?.country;

    dispatch(changeCity({ cityName: rightCityName, countryCode: rightCountry}));
    dispatch(emptySuggestions()); 
    dispatch(emptyUsersCity());
    // setUsersCity("");
    // setSuggestions([]);
  }

  function handleOpenBurger(){
    setIsOpen(!isOpen);
  }

  function moveToAnotherPage(trueOrFalse){
    setDisplaySearchBar(trueOrFalse);
    setIsOpen(false);
  }


  return (
    <header  className={`h-[10vh] w-full flex justify-between items-center px-12 relative ${theme ? "bg-[#252525]" : "bg-blue-500"} transition-all ease-in-out duration-300 max-[450px]:px-2 max-[700px]:min-w-[350px]`}>

    <div className={`h-auto w-32 py-4 px-2 rounded-xl absolute top-[10vh] z-10 flex flex-col items-center gap-2 shadow-sm shadow-black transition-all ease-in-out duration-300 ${isOpen ? "right-0" : "right-[-100%]"} ${theme ? "bg-[#3D3D3D]" : "bg-sky-600"} max-[900px]:w-52 max-[900px]:h-48`} >


      <nav className="h-[80%] w-full min-[900px]:hidden">
          <ul  className={`${theme ? "text-white" : "text-black"} flex flex-col items-center gap-2`}>
              <li>
                  <Link to="search" onClick={() => moveToAnotherPage(true)} >Search</Link>
              </li>
              <li>
                  <Link to="account" onClick={() => moveToAnotherPage(false)} >Account</Link>
              </li>
              <li>
                  <Link to="about" onClick={() => moveToAnotherPage(false)} >About</Link>
              </li>
          </ul>
      </nav>

      <div className="w-full max-[900px]:w-3/6 flex flex-col gap-2 justify-center items-center">
        <button className="bg-white w-[80%] rounded-xl" onClick={onChangeTheme} >{theme ? "light" : "dark"}</button>
        <button className="bg-white w-[80%] rounded-xl" onClick={onChangeTempType} >{temperatureType ? "°F" : "°C"}</button>
      </div>

    </div>


    <h1 className={`text-3xl font-bold ${theme ? "text-white" : "text-black"}`} >
      <Link  to="/" onClick={() => setDisplaySearchBar(false)} >Mw</Link>
    </h1>


    {displaySearchBar &&  <form className="flex gap-2" onSubmit={(e) => e.preventDefault()} >

        <div >

          <input type="text" placeholder="gatlinburg"  className="w-[20em] p-[5px] rounded-md outline-none relative border-[1px] border-black/50 max-[700px]:w-40" value={usersCity}  onChange={(e) => dispatch(typeUsersCity(e.target.value))} />


          {/* BOX THAT CONTAINS ALL CITIES WITH THE SAME NAME  */}
          <div className="h-auto absolute w-[20em] bg-white z-10 rounded-md max-[700px]:w-40" >

            {/* { suggestionLoading ?  */}
            { suggestionsIsLoading ? 

              <p>Loading...</p>
              :
              suggestions?.map((element, i) => <p className="p-2 cursor-pointer hover:bg-stone-400" key={element.lat + i} onClick={() => onClickChangeCity(i)} >{element.name}-{element.country}</p>)

            }

          </div>

        </div>

      </form>
    }


      {/*  NAV MENU VISIBLE ON SCREENS 900PX AND ABOVE  */}
      <nav className="max-[900px]:hidden">
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




      {/*  BURGER MENU ON THE RIGHT  */}
      <div className="cursor-pointer" onClick={handleOpenBurger} > 

          <span className={`block w-[25px] h-[2px] my-[5px] transition-all ease-in-out duration-300 ${isOpen && "rotate-[45deg] translate-y-[7px]"} ${theme ? "bg-white" : "bg-black"}`}></span>

          <span className={`block w-[25px] h-[2px] my-[5px] ${isOpen ? "opacity-0" : ""} transition-all ease-in-out duration-300 ${theme ? "bg-white" : "bg-black"}`}></span>

          <span className={`block w-[25px] h-[2px] my-[5px] transition-all ease-in-out duration-300 ${isOpen && "rotate-[-45deg] translate-y-[-7px]"} ${theme ? "bg-white" : "bg-black"}`}></span>

        </div>

    </header>
  )
}

export default Header
