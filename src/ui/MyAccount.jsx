import { UseAuthContext } from "../contexts/AuthContext";

const MyAccount = () => {

  const { logOut, authLoading } = UseAuthContext();

  return (
    < >
      
      <aside className="w-3/12 h-full bg-white/50" >

        <nav>
          <ul>
            <li>
              Profile
            </li>
            <li>
              My Cities
            </li>
            <li>
              <button className="bg-white px-3 py-2" onClick={logOut} disabled={authLoading}>{authLoading ? "Loading..." : "Log out"}</button>
            </li>
          </ul>
        </nav>

      </aside>


    </>
  )
}

export default MyAccount
