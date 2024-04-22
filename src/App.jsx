import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Suspense, lazy } from "react";

import Header from "./ui/Header";

import HomePage from "./ui/HomePage";
import MainCity from "./features/MainCity";



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
