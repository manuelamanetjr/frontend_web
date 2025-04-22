// Sidebar.jsx
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

export default function Sidebar({ isMobile, isOpen, toggleDropdown, openDropdown }) {
  const navItem = (href, Icon, label, isActive = false) => (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg relative ${
        isActive ? "bg-purple-900 text-white" : "text-black hover:text-gray-700"
      }`}
    >
      <Icon size={20} strokeWidth={1} />
      <span className="w-full text-center">{label}</span>
    </a>
  );

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
        {navItem("#", Layers, "Queues", true)}
        {navItem("#", MessageSquare, "Chats")}
        {navItem("#", Grid, "Department")}
        {navItem("#", User, "Profile")}

        <div className="relative">
          <button
            onClick={() => toggleDropdown("users")}
            className="flex items-center gap-3 text-black hover:text-gray-700 px-3 py-2 w-full"
          >
            <Users size={20} strokeWidth={1} />
            <span className="w-full text-center">Users</span>
            {openDropdown === "users" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openDropdown === "users" &&
            dropdownBox(
              <>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Manage Agents
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Change Roles
                </a>
              </>
            )}
        </div>

        {navItem("#", Repeat, "Auto-Replies")}

        <div className="relative">
          <button
            onClick={() => toggleDropdown("macros")}
            className="flex items-center gap-3 text-black hover:text-gray-700 px-3 py-2 w-full"
          >
            <List size={20} strokeWidth={1} />
            <span className="w-full text-center">Macros</span>
            {openDropdown === "macros" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openDropdown === "macros" &&
            dropdownBox(
              <>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Agents
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Clients
                </a>
              </>
            )}
        </div>

        {navItem("#", UserCheck, "Manage Admin")}
        {navItem("#", Command, "Roles")}
      </nav>
    </aside>
  );
}
