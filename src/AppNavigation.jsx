import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from "../screens/Login.jsx"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* Add more routes like this: */}
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </Router>
    );
}

export default App;