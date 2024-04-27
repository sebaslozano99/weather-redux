import { UseTempContext } from "../contexts/TempContext"



const Account = () => {

  const { theme } = UseTempContext();

  return (
    <div className={`${theme ? "bg-[#252525]" : "bg-blue-500"} w-full h-screen transition-all ease-in-out duration-300`} >
      
    </div>
  )
}

export default Account
