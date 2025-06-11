import React, { useState, useEffect } from "react";
import api from "../src/api";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { Edit3, Search, X, Eye, EyeOff } from "react-feather";
import "../src/App.css";

export default function ManageAgents() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editActive, setEditActive] = useState(true);
  const [modalError, setModalError] = useState(null);

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/admins");
      setAgents(
        data.map((a) => ({
          sys_user_id: a.sys_user_id,
          username: a.sys_user_email,
          password: a.sys_user_password,
          active: a.sys_user_is_active,
        }))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const filteredAgents = agents.filter((agent) =>
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saveAdmin = async () => {
    setModalError(null); // reset modal error

    if (!editUsername || !editPassword) {
      setModalError("Username and password are required");
      return;
    }

    const updatedBy = 1;

    try {
      if (currentEditId !== null) {
        await api.put(`admins/${currentEditId}`, {
          sys_user_email: editUsername,
          sys_user_password: editPassword,
          sys_user_is_active: editActive,
          sys_user_updated_by: updatedBy,
        });
      } else {
        await api.post("/admins", {
          sys_user_email: editUsername,
          sys_user_password: editPassword,
          sys_user_is_active: true,
          sys_user_created_by: updatedBy,
        });
      }
      await fetchAdmins();
      setIsModalOpen(false);
      setCurrentEditId(null);
      setEditUsername("");
      setEditPassword("");
      setEditActive(true);
      setModalError(null); // clear on success
    } catch (err) {
      setModalError(err.response?.data?.message || "Failed to save admin");
    }
  };

  const toggleActiveStatus = async (sys_user_id) => {
    const idx = agents.findIndex((a) => a.sys_user_id === sys_user_id);
    if (idx === -1) return;

    const admin = agents[idx];
    const updatedBy = 1;

    try {
      setAgents((prev) =>
        prev.map((a) =>
          a.sys_user_id === sys_user_id ? { ...a, active: !a.active } : a
        )
      );

      await api.put(`admins/${sys_user_id}/toggle`, {
        sys_user_is_active: !admin.active,
        sys_user_updated_by: updatedBy,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to toggle active status");
      setAgents((prev) =>
        prev.map((a) =>
          a.sys_user_id === sys_user_id ? { ...a, active: admin.active } : a
        )
      );
    }
  };

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
                  setEditActive(true);
                  setCurrentEditId(null);
                  setShowPassword(false);
                  setIsModalOpen(true);
                  setModalError(null);
                }}
                className="bg-[#6237A0] text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition-colors duration-300"
              >
                Add Account
              </button>
            </div>

            <div className="overflow-y-auto max-h-[65vh] w-full custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 bg-white sticky top-0 z-10 shadow-[inset_0_-1px_0_0_#000000]">
                  <tr>
                    <th className="py-2 px-3 pl-3">Username</th>
                    <th className="py-2 px-3 text-center">Active Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent) => (
                    <tr
                      key={agent.sys_user_id}
                      className="transition-colors duration-200 hover:bg-gray-100"
                    >
                      <td className="py-2 px-3 flex items-center gap-2">
                        <p className="text-sm break-words max-w-[200px] whitespace-pre-wrap">
                          {agent.username}
                        </p>
                        <Edit3
                          size={18}
                          strokeWidth={1}
                          className="text-gray-500 cursor-pointer w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200 hover:text-purple-700"
                          onClick={() => {
                            setCurrentEditId(agent.sys_user_id);
                            setEditUsername(agent.username);
                            setEditPassword(agent.password);
                            setEditActive(agent.active);
                            setShowPassword(false);
                            setIsModalOpen(true);
                            setError(null);
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
                              toggleActiveStatus(agent.sys_user_id)
                            }
                          />
                          <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#6237A0] transition-colors duration-300 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform after:duration-300 peer-checked:after:translate-x-3" />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {loading && (
                <p className="pt-15 text-center text-gray-600">Loading...</p>
              )}
              {error && (
                <p className="pt-15 text-center text-red-600 mb-2 font-semibold">
                  {error}
                </p>
              )}
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-400/50 flex justify-center items-center z-50 transition-opacity duration-300">
              <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform scale-95 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-xl">
                    {currentEditId !== null ? "Edit Admin" : "Add Admin"}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <X size={24} strokeWidth={2} />
                  </button>
                </div>

                {modalError && (
                  <p className="text-red-600 mb-3 font-semibold">
                    {modalError}
                  </p>
                )}

                <label className="block mb-3">
                  <span className="block text-sm font-medium text-gray-700">
                    Username
                  </span>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                  />
                </label>

                <label className="block mb-3 relative">
                  <span className="block text-sm font-medium text-gray-700">
                    Password
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 pr-10 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </label>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setModalError(null);
                    }}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveAdmin}
                    className="bg-[#6237A0] text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
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
