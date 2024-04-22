import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeCity } from "../features/mainCitySlice";


const Header = () => {

  const [city, setCity] = useState("");
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const dispatch = useDispatch();

  function onSubmit(e){
    e.preventDefault();
    if(!city) return;
    dispatch(changeCity(city));
    setCity("");
  }

  return (
    <header  className="h-[10vh] w-full flex justify-between items-center bg-blue-500 px-12">
      <h1 className="text-3xl font-bold" >
        <Link  to="/" onClick={() => setDisplaySearchBar(false)} >I&apos;m Weather</Link>
      </h1>

    {displaySearchBar &&  <form className="flex gap-2" onSubmit={(e) => onSubmit(e)} >
        <input type="text" placeholder="gatlinburg"  className="w-[20em] p-[5px] rounded-md outline-none" value={city} onChange={(e) => setCity(e.target.value)} />
        <button className="bg-white px-[15px] py-[2px] rounded-md" >Search</button>
      </form>
    }

      <nav>
        <ul  className="flex gap-6">
            <li>
                <Link to="mainCity" onClick={() => setDisplaySearchBar(true)} >Main City</Link>
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
