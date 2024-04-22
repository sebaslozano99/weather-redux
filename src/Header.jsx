import { Link } from "react-router-dom"



const Header = () => {
  return (
    <header  className="h-[10vh] w-full flex justify-around items-center">
      <h1 className="text-3xl font-bold" >
        <Link  to="/">I&apos;m Weather</Link>
      </h1>


      <nav>
        <ul  className="flex gap-6">
            <li>
                <Link to="mainCity">Main City</Link>
            </li>
            <li>
                <Link to="account">Account</Link>
            </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
