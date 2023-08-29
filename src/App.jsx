import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import NavbarComp from "./components/Navbar/Navbar.jsx";
import Planets from "./pages/Planets";
import Species from "./pages/Species";
import Peoples from "./pages/Peoples";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Starships from "./pages/Starships";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


const App = () => {
    const queryClient = new QueryClient()
  return (
      <QueryClientProvider client={queryClient}>
          <div style={{backgroundColor: "#F0F2F5" , height:"auto"}}>
              <NavbarComp/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route  path="/people" element={<Peoples/>} />
                  <Route path="/planets" element={<Planets/>} />
                  <Route path="/species" element={<Species/>} />
                  <Route path="/films" element={<Films/>} />
                  <Route path="/starships" element={<Starships/>} />
              </Routes>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

);
}
export default App;
