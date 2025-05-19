import React, { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { Search, X } from "react-feather";
import "../src/App.css";

export default function ChangeRoles() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { name: "alicejohnson", active: true, role: "Admin"},
    { name: "bobmartin", active: false, role: "Agent"},
    { name: "evetorres", active: true, role: "Agent"},
  ]);

  const roles = ["Admin", "Agent", "Supervisor"];

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isMobile={true}
          isOpen={mobileSidebarOpen}
          toggleDropdown={setOpenDropdown}
          openDropdown={openDropdown}
        />
        <Sidebar
          isMobile={false}
          toggleDropdown={setOpenDropdown}
          openDropdown={openDropdown}
        />

        <main className="flex-1 bg-gray-100 p-15 overflow-hidden transition-colors duration-300 flex flex-col">
          <div className="bg-white p-4 rounded-lg flex flex-col flex-1 min-h-0">
            {/* Search bar */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-1/3 relative">
                <Search size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none text-sm w-full pr-6"
                />
                {searchQuery && (
                  <X
                    size={16}
                    className="text-gray-500 cursor-pointer absolute right-3 hover:text-gray-700"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>
            </div>

            {/* Table section */}
            <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 bg-white sticky top-0 z-10 shadow-[inset_0_-1px_0_0_#000000]">
                  <tr>
                    <th className="py-2 px-3 pl-3">Username</th>
                    <th className="py-2 px-3 text-center">Active Status</th>
                    <th className="py-2 px-3 text-center">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <tr
                      key={idx}
                      className="transition-colors duration-200 hover:bg-gray-50"
                    >
                      <td className="py-2 px-3 flex items-center gap-2">
                        {user.name}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={user.active}
                            onChange={() =>
                              setUsers((prev) =>
                                prev.map((u, i) =>
                                  i === idx ? { ...u, active: !u.active } : u
                                )
                              )
                            }
                          />
                          <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#6237A0] transition-colors duration-300 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform after:duration-300 peer-checked:after:translate-x-3" />
                        </label>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <select
                          className="px-2 py-1 text-sm text-gray-800 rounded-md border border-transparent focus:outline-none focus:ring-0 hover:cursor-pointer"
                          value={user.role}
                          onChange={(e) =>
                            setUsers((prev) =>
                              prev.map((u, i) =>
                                i === idx ? { ...u, role: e.target.value } : u
                              )
                            )
                          }
                        >
                          {roles.map((role, i) => (
                            <option
                              key={i}
                              value={role}
                              className="bg-[#f3f4f6] text-[#1f2937] hover:bg-gray-100"
                            >
                              {role}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
