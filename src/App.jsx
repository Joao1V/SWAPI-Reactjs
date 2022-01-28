import React from 'react'
import HomePage from "./pages/Peoples";
import { Routes, Route, Link } from "react-router-dom";
import NavbarComp from "./components/Navbar";
import Planets from "./pages/Planets";
import Species from "./pages/Species";
import Peoples from "./pages/Peoples";
import Home from "./pages/Home";


const App = () => {
  return (
    <div style={{backgroundColor: "#F0F2F5" , height:"100vh"}}>
        <NavbarComp/>
        <Routes>
                <Route path="/" element={<Home/>}/>
                <Route  path="/people" element={<Peoples/>} />
                <Route path="/planets" element={<Planets/>} />
                <Route path="/species" element={<Species/>} />
        </Routes>
    </div>
);
}
export default App;
