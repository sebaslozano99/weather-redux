import { UseAuthContext } from "../contexts/AuthContext";
import { UseTempContext } from "../contexts/TempContext";
import LogIn from "../ui/LogIn";
import MyAccount from "../ui/MyAccount";


const Account = () => {

  const { theme } = UseTempContext();
  const { user } = UseAuthContext();

  return (
    <main className={`${theme ? "bg-[#252525]" : "bg-blue-500"} w-full h-[90vh]`} >
      {
        user ?

        <MyAccount />

        :

        <LogIn />
      }
    </main>
  )
}

export default Account
