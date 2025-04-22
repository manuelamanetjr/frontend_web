import React from "react";
import {
  Layers,
  User,
  MessageSquare,
  Grid,
  Users,
  Repeat,
  List,
  UserCheck,
  Command,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isMobile, isOpen, toggleDropdown, openDropdown }) {
  const location = useLocation();

  const navItem = (to, Icon, label, extraMatchPaths = []) => {
    const isActive = location.pathname === to || extraMatchPaths.includes(location.pathname);
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg relative ${
          isActive ? "bg-purple-900 text-white" : "text-black hover:text-gray-700"
        }`}
      >
        <Icon size={20} strokeWidth={1} />
        <span className="w-full text-center">{label}</span>
      </Link>
    );
  };

  const dropdownBox = (children) => (
    <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg border border-gray-100 rounded-lg z-50 text-sm text-gray-700">
      {children}
    </div>
  );

  if (isMobile && !isOpen) return null;

  return (
    <aside
      className={`${
        isMobile ? "absolute top-16 left-0 z-40 h-[calc(100vh-4rem)]" : "hidden md:flex"
      } w-64 bg-white text-black flex-col p-6 shadow-md overflow-y-auto`}
    >
      <nav className="flex flex-col gap-6 mt-4 relative">
        {navItem("/queues", Layers, "Queues")}
        {navItem("/chats", MessageSquare, "Chats")}
        {navItem("/department", Grid, "Department")}
        {navItem("/profile", User, "Profile")}

        {/* Users Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("users")}
            className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg ${
              ["/manage-agents", "/change-role"].includes(location.pathname)
                ? "bg-purple-900 text-white"
                : "text-black hover:text-gray-700"
            }`}
          >
            <Users size={20} strokeWidth={1} />
            <span className="w-full text-center">Users</span>
            {openDropdown === "users" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openDropdown === "users" &&
            dropdownBox(
              <>
                <Link to="/manage-agents" className="block px-4 py-2 hover:bg-gray-100">
                  Manage Agents
                </Link>
                <Link to="/change-role" className="block px-4 py-2 hover:bg-gray-100">
                  Change Roles
                </Link>
              </>
            )}
        </div>

        {navItem("/auto-replies", Repeat, "Auto-Replies")}

        {/* Macros Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("macros")}
            className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg ${
              ["/macros-agents", "/macros-clients"].includes(location.pathname)
                ? "bg-purple-900 text-white"
                : "text-black hover:text-gray-700"
            }`}
          >
            <List size={20} strokeWidth={1} />
            <span className="w-full text-center">Macros</span>
            {openDropdown === "macros" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openDropdown === "macros" &&
            dropdownBox(
              <>
                <Link to="/macros-agents" className="block px-4 py-2 hover:bg-gray-100">
                  Agents
                </Link>
                <Link to="/macros-clients" className="block px-4 py-2 hover:bg-gray-100">
                  Clients
                </Link>
              </>
            )}
        </div>

        {navItem("/manage-admin", UserCheck, "Manage Admin")}
        {navItem("/roles", Command, "Roles")}
      </nav>
    </aside>
  );
}
