import React, { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { Edit3, Search, X, Eye, EyeOff } from "react-feather";

export default function ManageAgents() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [agents, setAgents] = useState([
    {
      username: "johndoe",
      password: "pass123",
      active: true,
      Role: "Super Admin",
    },
    { username: "janesmith", password: "secret", active: false, Role: "Admin" },
    { username: "tomjohnson", password: "123456", active: true, Role: "Admin" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);

  const Role = ["Admin", "Super Admin"];
  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const filteredAgents = agents.filter((agent) =>
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
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
                <Search
                  size={18}
                  strokeWidth={1}
                  className="text-gray-500 mr-2 flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="Search usernames..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none text-sm w-full pr-6"
                />
                {searchQuery && (
                  <X
                    size={16}
                    strokeWidth={1}
                    className="text-gray-500 cursor-pointer absolute right-3 hover:text-gray-700"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>

              <button
                onClick={() => {
                  setEditUsername("");
                  setEditPassword("");
                  setEditRole("Admin");
                  setCurrentEditIndex(null);
                  setShowPassword(false);
                  setIsModalOpen(true);
                }}
                className="bg-[#6237A0] text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition-colors duration-300"
              >
                Add Account
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="py-2 px-3 pl-3">Username</th>
                    <th className="py-2 px-3 text-center">Active Status</th>
                    <th className="py-2 px-3 text-center">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent, idx) => (
                    <tr key={idx} className="transition-colors duration-200">
                      <td className="py-2 px-3 flex items-center gap-2">
                        {agent.username}
                        <Edit3
                          size={18}
                          strokeWidth={1}
                          className="text-gray-500 cursor-pointer w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200 hover:text-purple-700"
                          onClick={() => {
                            setCurrentEditIndex(idx);
                            setEditUsername(agent.username);
                            setEditPassword(agent.password);
                            setEditRole(agent.Role);
                            setShowPassword(false);
                            setIsModalOpen(true);
                          }}
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={agent.active}
                            onChange={() =>
                              setAgents((prev) =>
                                prev.map((a, i) =>
                                  i === idx ? { ...a, active: !a.active } : a
                                )
                              )
                            }
                          />
                          <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#6237A0] transition-colors duration-300 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform after:duration-300 peer-checked:after:translate-x-3" />
                        </label>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <select
                          className="rounded-md px-2 py-1 text-sm bg-white text-gray-800 outline-none"
                          value={agent.Role}
                          onChange={(e) =>
                            setAgents((prev) =>
                              prev.map((a, i) =>
                                i === idx ? { ...a, Role: e.target.value } : a
                              )
                            )
                          }
                        >
                          {Role.map((roles, i) => (
                            <option key={i} value={roles}>
                              {roles}
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

          {/* Modal for Add/Edit */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-400/50 flex justify-center items-center z-50 transition-opacity duration-300">
              <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform scale-95 animate-fadeIn transition-transform duration-300 ease-out">
                <h2 className="text-md font-semibold mb-4">
                  {currentEditIndex !== null ? "Edit Admin" : "Add Admin"}
                </h2>

                <label className="text-sm text-gray-700 mb-1 block">
                  Username
                </label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm mb-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                />

                <label className="text-sm text-gray-700 mb-1 block">
                  Password
                </label>
                <div className="relative mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm pr-10 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                  />
                  <span
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </div>

                {/* Only show role when adding a new account */}
                {currentEditIndex === null && (
                  <>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Role
                    </label>
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="w-full border rounded-md p-2 text-sm mb-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                    >
                      {Role.map((role, i) => (
                        <option key={i} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-1 rounded-lg text-sm hover:bg-gray-400 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (currentEditIndex !== null) {
                        setAgents((prev) =>
                          prev.map((a, i) =>
                            i === currentEditIndex
                              ? {
                                  ...a,
                                  username: editUsername,
                                  password: editPassword,
                                }
                              : a
                          )
                        );
                      } else {
                        setAgents((prev) => [
                          ...prev,
                          {
                            username: editUsername,
                            password: editPassword,
                            active: true,
                            Role: editRole,
                          },
                        ]);
                      }
                      setIsModalOpen(false);
                    }}
                    className="bg-purple-700 text-white px-4 py-1 rounded-lg text-sm hover:bg-purple-800 transition-colors duration-300"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
