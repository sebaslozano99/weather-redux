import { useEffect } from "react";
import { UseAuthContext } from "../contexts/AuthContext";
import { UseUserCitiesContext } from "../contexts/CitiesContext";

const MyAccount = () => {

  const { logOut, authLoading, user } = UseAuthContext();
  const { dispatch } = UseUserCitiesContext();

  useEffect(() => {
    console.log(user?.user.id);
  }, [user])

   function onLogOut(){
    dispatch({type: "userCities/emptyIt"}); //I had to do this, since I had a bug that when user Signed out, the "userCities" & "userCitiesInfo" kept the data from previous user. thus at the moment of a new user signs in, it would've appear the list of cities the previous user had
    logOut();
   }

  return (
    < >
      
      <aside className="w-3/12 h-full bg-white/50" >

        <p>Welcome, <em className="text-red-500" >{user?.user.id}</em></p>

        <nav>
          <ul>
            <li>
              Profile
            </li>
            <li>
              My Cities
            </li>
            <li>
              <button className="bg-white px-3 py-2" onClick={onLogOut} disabled={authLoading}>{authLoading ? "Loading..." : "Log out"}</button>
            </li>
          </ul>
        </nav>

      </aside>


    </>
  )
}

export default MyAccount
