import React, { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { Edit3, Search, X } from "react-feather";

export default function ChangeRoles() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { name: "Alice Johnson", active: true, role: "admin" },
    { name: "Bob Martin", active: false, role: "agent" },
    { name: "Eve Torres", active: true, role: "agent" },
  ]);

  const roles = ["admin", "agent"];

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

        <main className="flex-1 bg-gray-100 p-15 overflow-y-auto transition-colors duration-300">
          <div className="bg-white p-4 rounded-lg min-h-[80vh] transition-all duration-300">
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

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="py-2 px-3 pl-3">Account</th>
                    <th className="py-2 px-3 text-center">Active</th>
                    <th className="py-2 px-3 text-center">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors duration-200"
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
                          <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition-colors duration-300 relative after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-transform after:duration-300 peer-checked:after:translate-x-4" />
                        </label>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <select
                          className="border rounded-md px-2 py-1 text-sm bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                          value={user.role}
                          onChange={(e) =>
                            setUsers((prev) =>
                              prev.map((u, i) =>
                                i === idx
                                  ? { ...u, role: e.target.value }
                                  : u
                              )
                            )
                          }
                        >
                          {roles.map((role, i) => (
                            <option key={i} value={role}>
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
