import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthContext} from "./contexts/AuthContext";
import { TempContext } from "./contexts/TempContext";
import { SuggestionsContext } from "./contexts/SuggestionsContext";
// import { Suspense, lazy } from "react";

import Header from "./ui/Header";

import HomePage from "./pages/HomePage";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Footer from "./ui/Footer";
import SignUp from "./pages/SignUp";


const App = () => {

  return (
    <BrowserRouter>

      <AuthContext>
        <TempContext>
          <SuggestionsContext>
            <Header />
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="search" element={ <Search /> } />
                <Route path="search/:id" element={ <Details /> } />
                <Route path="account" element={ <Account /> } />
                <Route path="signup" element={ <SignUp /> } />
                <Route path="about" element={ <p>About</p> } />

            </Routes>
            <Footer />
          </SuggestionsContext>
        </TempContext>
      </AuthContext>
    </BrowserRouter>
  )
}

export default App
