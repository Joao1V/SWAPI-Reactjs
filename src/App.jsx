import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import NavbarComp from "./components/Navbar";
import Planets from "./pages/Planets";
import Species from "./pages/Species";
import Peoples from "./pages/Peoples";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Starships from "./pages/Starships";


const App = () => {
  return (
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
);
}
export default App;
