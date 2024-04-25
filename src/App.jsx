import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Suspense, lazy } from "react";

import Header from "./ui/Header";

import HomePage from "./ui/HomePage";
import MainCity from "./features/MainCity";
import { TempContext } from "./contexts/TempContext";



const App = () => {
  return (
    <BrowserRouter>
      <TempContext>
        <Header />
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="mainCity" element={ <MainCity /> } />
        </Routes>
      </TempContext>
    </BrowserRouter>
  )
}

export default App
