import { UseAuthContext } from "../contexts/AuthContext";
import { UseTempContext } from "../contexts/TempContext";
import LogIn from "../ui/LogIn";
import MyAccount from "../ui/MyAccount";


const Account = () => {

  const { theme } = UseTempContext();
  const { user } = UseAuthContext();

  return (
    <div className={`${theme ? "bg-[#252525]" : "bg-blue-500"}`} >
      {
        user ?

        <MyAccount />

        :

        <LogIn />
      }
    </div>
  )
}

export default Account
