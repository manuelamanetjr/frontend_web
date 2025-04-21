import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from "../screens/Login.jsx";
import Navbar from "../components/Navbar.jsx"

function AppNavigation() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="Navbar" element ={<Navbar/>}/>
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </Router>
    );
}

export default AppNavigation;