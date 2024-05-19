import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Suspense, lazy } from "react";

import Header from "./ui/Header";

import HomePage from "./pages/HomePage";
import { TempContext } from "./contexts/TempContext";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Details from "./pages/Details";
import { SuggestionsContext } from "./contexts/SuggestionsContext";
import Footer from "./ui/Footer";




const App = () => {


  return (
    <BrowserRouter>
      <TempContext>
        <SuggestionsContext>
          <Header />
          <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="search" element={ <Search /> } />
              <Route path="search/:id" element={ <Details /> } />
              <Route path="account" element={ <Account /> } />
          </Routes>
          <Footer />
        </SuggestionsContext>
      </TempContext>
    </BrowserRouter>
  )
}

export default App
