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
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isMobile, isOpen, toggleDropdown, openDropdown }) => {
  const location = useLocation();

  const navItems = [
    { to: "/queues", icon: Layers, label: "Queues" },
    { to: "/chats", icon: MessageSquare, label: "Chats" },
    { to: "/department", icon: Grid, label: "Department" },
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/auto-replies", icon: Repeat, label: "Auto-Replies" },
    { to: "/manage-admin", icon: UserCheck, label: "Manage Admin" },
    { to: "/roles", icon: Command, label: "Roles" },
  ];

  const isActivePath = (to, extraPaths = []) =>
    location.pathname === to || extraPaths.includes(location.pathname);

  const renderNavItem = (to, Icon, label, extraPaths = []) => {
    const isActive = isActivePath(to, extraPaths);

    return (
      <div className="relative" key={to}>
        {isActive && (
          <motion.div
            layoutId="activeHighlight"
            className="absolute inset-0 rounded-lg bg-[#6237A0] z-0"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <Link
          to={to}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg z-10 ${
            isActive ? "text-white" : "text-black hover:text-gray-700"
          }`}
        >
          <Icon size={18} strokeWidth={1} />
          <span className="w-full text-center">{label}</span>
        </Link>
      </div>
    );
  };

  const DropdownItem = ({ icon: Icon, items, id }) => {
    const isOpenDropdown = openDropdown === id;
    const activeItem = items.find((item) => location.pathname === item.to);
    const isActive = !!activeItem;

    return (
      <div className="relative">
        {isActive && (
          <motion.div
            layoutId="activeHighlight"
            className="absolute inset-0 rounded-lg bg-[#6237A0] z-0"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <button
          onClick={() => toggleDropdown(id)}
          className={`relative flex items-center gap-3 px-3 py-2 w-full rounded-lg z-10 ${
            isActive ? "text-white" : "text-black hover:text-gray-700"
          }`}
        >
          <Icon size={18} strokeWidth={1} />
          <span className="w-full text-center">
            {activeItem ? activeItem.label : id.charAt(0).toUpperCase() + id.slice(1)}
          </span>
          {isOpenDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence mode="wait">
          {isOpenDropdown && (
            <motion.div
              key={id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg border border-gray-100 rounded-lg z-50 text-sm text-gray-700"
            >
              {items.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  if (isMobile && !isOpen) return null;

  return (
    <aside
      className={`${
        isMobile
          ? "absolute top-16 left-0 z-40 h-[calc(100vh-4rem)]"
          : "hidden md:flex"
      } w-64 bg-white text-black flex-col p-6 shadow-md overflow-y-auto`}
    >
      <nav className="flex flex-col gap-6 mt-4 relative">
        {navItems.map((item) =>
          renderNavItem(item.to, item.icon, item.label)
        )}

        <DropdownItem
          icon={Users}
          id="users"
          items={[
            { to: "/manage-agents", label: "Manage Agents" },
            { to: "/change-role", label: "Change Roles" },
          ]}
        />

        <DropdownItem
          icon={List}
          id="macros"
          items={[
            { to: "/macros-agents", label: "Agents" },
            { to: "/macros-clients", label: "Clients" },
          ]}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
