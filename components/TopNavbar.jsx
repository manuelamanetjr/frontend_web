// TopNavbar.jsx
import React from "react";
import { Menu } from "react-feather";

export default function TopNavbar({ toggleSidebar }) {
  return (
    <header className="h-16 bg-white shadow flex items-center z-50 pl-16 relative justify-between pr-6">
      <button
        className="md:hidden absolute left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
        onClick={toggleSidebar}
      >
        <Menu size={24} strokeWidth={1} />
      </button>

      <div className="flex items-center gap-3">
        <img src="src/assets/images/icon.png" alt="Servana Logo" className="h-10 w-10" />
        <span
          className="text-xl font-semibold text-purple-800 relative"
          style={{ top: "-1px" }}
        >
          servana
        </span>
      </div>

      <div className="flex items-center gap-3">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Maria Dela Cruz"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-gray-700">Maria Dela Cruz</span>
      </div>
    </header>
  );
}
