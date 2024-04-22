import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage"
import MainCity from "./MainCity"
import Header from "./Header"



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="mainCity" element={ <MainCity /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
