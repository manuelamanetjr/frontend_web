import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../screens/Login.jsx"
import Queues from "../screens/queues.jsx"

function AppNavigation() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/queues" element={<Queues />} />
                {/* Add more routes like this: */}
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </Router>
    );
}

export default AppNavigation;