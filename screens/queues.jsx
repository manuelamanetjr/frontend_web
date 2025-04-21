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
} from "react-feather";

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  return (
    <div className="flex flex-col h-screen relative">
      {/* Top Navbar */}
      <header className="h-16 bg-white shadow flex items-center z-50 pl-16 pr-4 relative justify-between">
        {/* Toggle Button (Burger) */}
        <button
          className="md:hidden absolute left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setMobileSidebarOpen((prev) => !prev)}
        >
          <Menu size={24} strokeWidth={1} />
        </button>

        {/* Logo + Name (Fixed Left) */}
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

        {/* Profile (Right Side) */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=47"
            alt="Maria Dela Cruz"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="hidden sm:inline text-sm font-medium text-gray-800">
            Maria Dela Cruz
          </span>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <aside className="fixed top-16 left-0 w-64 bg-white text-black flex flex-col p-6 z-40 md:hidden h-[calc(100vh-4rem)] shadow-md overflow-y-auto">
          <nav className="flex flex-col gap-6 mt-4">
            {navItem("#", Layers, "Queues", true)}
            {navItem("#", MessageSquare, "Chats")}
            {navItem("#", Grid, "Department")}
            {navItem("#", User, "Profile")}
            {navItem("#", Users, "Users")}
            {navItem("#", Repeat, "Auto-Replies")}
            {navItem("#", List, "Macros")}
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
            {navItem("#", Users, "Users")}
            {navItem("#", Repeat, "Auto-Replies")}
            {navItem("#", List, "Macros")}
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
