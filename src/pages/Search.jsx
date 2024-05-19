import { UseTempContext } from "../contexts/TempContext"
import MainCity from "../features/mainCity/MainCity";



const Search = () => {

  const { theme } = UseTempContext();

  return (
    <main className={`h-[90vh] w-full ${theme ? "bg-[#252525]" : "bg-blue-500"} transition-all ease-out duration-300 p-4 flex gap-5 max-[800px]:flex-col max-[800px]:h-auto`}>
      <MainCity />
    </main>
  )
}

export default Search
