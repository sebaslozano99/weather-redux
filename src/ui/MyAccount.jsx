import { useEffect } from "react";
import { UseAuthContext } from "../contexts/AuthContext";
import { UseUserCitiesContext } from "../contexts/CitiesContext";
import { NavLink, Outlet } from "react-router-dom";
import { UseTempContext } from "../contexts/TempContext";

const MyAccount = () => {

  const { logOut, authLoading, user } = UseAuthContext();
  const { dispatch } = UseUserCitiesContext();
  const { theme } = UseTempContext();

  useEffect(() => {
    console.log(user?.user.id);
  }, [user])

   function onLogOut(){
    dispatch({type: "userCities/emptyIt"}); //I had to do this, since I had a bug that when user Signed out, the "userCities" & "userCitiesInfo" kept the data from previous user. thus at the moment of a new user signs in, it would've appear the list of cities the previous user had
    logOut();
   }

  return (
    <div className="w-full h-full flex">
      
      <aside className={`w-[15%] h-full p-5 ${!theme ? "bg-blue-600/20" : "bg-black/20"}`} >

        {/* <p className="text-base">User: <em className="font-bold" >{user?.user.id}</em></p> */}

        <nav className="mt-4">
          <ul className={`flex flex-col gap-4 text-base`} >
            <li>
              <NavLink to="profile" className={`${theme ? "text-white": ""}`} >Profile</NavLink>
            </li>
            <li>
              <NavLink to="myCities" className={`${theme ? "text-white": ""}`} >My Cities</NavLink>
            </li>

            <button className="bg-white w-20 rounded px-1 py-1" onClick={onLogOut} disabled={authLoading}>{authLoading ? "Loading..." : "Log out"}</button>
            
          </ul>
        </nav>

      </aside>

      <Outlet />

    </div>
  )
}

export default MyAccount
