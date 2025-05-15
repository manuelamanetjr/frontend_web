import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../screens/Login.jsx";
import Queues from "../screens/Queues.jsx";
import Chats from "../screens/Chats.jsx";
import Department from "../screens/Department.jsx";
import Profile from "../screens/Profile.jsx";
import ManageAgents from "../screens/ManageAgents.jsx";
import ChangeRole from "../screens/ChangeRoles.jsx";
import AutoReplies from "../screens/AutoReplies.jsx";
import Agents from "../screens/MacrosAgents.jsx";
import Clients from "../screens/MacrosClients.jsx";
import ManageAdmin from "../screens/ManageAdmin.jsx";
import Roles from "../screens/Roles.jsx";
import MacrosAgents from "../screens/MacrosAgents.jsx";
import MacrosClients from "../screens/MacrosClients.jsx";

function AppNavigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Queues" element={<Queues />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/department" element={<Department />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-agents" element={<ManageAgents />} />
        <Route path="/change-role" element={<ChangeRole />} />
        <Route path="/auto-replies" element={<AutoReplies />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/macros-agents" element={<MacrosAgents />} />
        <Route path="/macros-clients" element={<MacrosClients />} />
        <Route path="/manage-admin" element={<ManageAdmin />} />
        <Route path="/roles" element={<Roles />} />
        
      </Routes>
    </Router>
  );
}

export default AppNavigation;
