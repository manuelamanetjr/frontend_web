import React, { useState } from "react";
import {
  Layers,
  User,
  Menu,
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

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const navItem = (href, Icon, label, isActive = false) => (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg relative ${
        isActive
          ? "bg-purple-900 text-white"
          : "text-black hover:text-gray-700"
      }`}
    >
      <Icon size={20} strokeWidth={1} />
      <span className="w-full text-center">{label}</span>
    </a>
  );

  const dropdownBox = (children) => (
    <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg z-10 text-sm text-gray-700">
      {children}
    </div>
  );

  return (
    <div className="flex flex-col h-screen relative">
      {/* Top Navbar */}
      <header className="h-16 bg-white shadow flex items-center z-50 pl-16 relative">
        {/* Toggle Button (Burger) */}
        <button
          className="md:hidden absolute left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setMobileSidebarOpen((prev) => !prev)}
        >
          <Menu size={24} strokeWidth={1} />
        </button>

        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="src/assets/images/icon.png"
            alt="Servana Logo"
            className="h-10 w-10"
          />
          <span
            className="text-xl font-semibold text-purple-800 relative"
            style={{ top: "-1px" }}
          >
            servana
          </span>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <aside className="absolute top-16 left-0 w-64 bg-white text-black flex flex-col p-6 z-40 md:hidden h-[calc(100vh-4rem)] shadow-md">
          <nav className="flex flex-col gap-6 mt-4">
            {navItem("#", Layers, "Queues", true)}
            {navItem("#", MessageSquare, "Chats")}
            {navItem("#", Grid, "Department")}
            {navItem("#", User, "Profile")}

            {/* Users Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("users")}
                className="flex items-center gap-3 text-black hover:text-gray-700 px-3 py-2 w-full"
              >
                <Users size={20} strokeWidth={1} />
                <span className="w-full text-center">Users</span>
                {openDropdown === "users" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
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

            {/* Macros Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("macros")}
                className="flex items-center gap-3 text-black hover:text-gray-700 px-3 py-2 w-full"
              >
                <List size={20} strokeWidth={1} />
                <span className="w-full text-center">Macros</span>
                {openDropdown === "macros" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
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
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 bg-white text-black flex-col p-6 shadow-md">
          <nav className="flex flex-col gap-6">
            {navItem("#", Layers, "Queues", true)}
            {navItem("#", MessageSquare, "Chats")}
            {navItem("#", Grid, "Department")}
            {navItem("#", User, "Profile")}

            {/* Users Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("users")}
                className="flex items-center gap-3 text-black hover:text-gray-700 px-3 py-2 w-full"
              >
                <Users size={20} strokeWidth={1} />
                <span className="w-full text-center">Users</span>
                {openDropdown === "users" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
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

            {/* Macros Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("macros")}
                className="flex items-center gap-3 text-black hover:text-gray-700 px-3 py-2 w-full"
              >
                <List size={20} strokeWidth={1} />
                <span className="w-full text-center">Macros</span>
                {openDropdown === "macros" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
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

        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
          <p>This is the main content area.</p>
        </main>
      </div>
    </div>
  );
}
