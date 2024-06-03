import { UseAuthContext } from "../contexts/AuthContext";

const MyAccount = () => {

  const { logOut, authLoading } = UseAuthContext();

  return (
    <div className="w-full h-screen transition-all ease-in-out duration-300 border-2 border-red-500" >
      My account


      <button className="bg-white px-3 py-2" onClick={logOut} disabled={authLoading} >{authLoading ? "Loading..." : "Log out"}</button>
    </div>
  )
}

export default MyAccount
