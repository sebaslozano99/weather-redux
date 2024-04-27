import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Suspense, lazy } from "react";

import Header from "./ui/Header";

import HomePage from "./pages/HomePage";
import MainCity from "./features/MainCity";
import { TempContext } from "./contexts/TempContext";
import Account from "./pages/Account";




const App = () => {


  return (
    <BrowserRouter>
      <TempContext>
        <Header />
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="mainCity" element={ <MainCity /> } />
            <Route path="account" element={ <Account /> } />
        </Routes>
      </TempContext>
    </BrowserRouter>
  )
}

export default App
