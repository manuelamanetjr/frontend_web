import React, { useState, useEffect } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { Edit3, Search, X, ChevronLeft, ChevronRight } from "react-feather";

export default function ManageAgents() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleDepts, setVisibleDepts] = useState(4);
  const [deptScrollIndex, setDeptScrollIndex] = useState(0);

  const [agents, setAgents] = useState([
    {
      username: "johndoe",
      password: "pass123",
      active: true,
      departments: ["CSR"],
    },
    {
      username: "janesmith",
      password: "secret",
      active: false,
      departments: ["Billing"],
    },
    {
      username: "tomjohnson",
      password: "123456",
      active: true,
      departments: ["Sales", "CSR"],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const departments = ["CSR", "Billing", "Sales", "Tech Support", "Admin", "HR"];

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const filteredAgents = agents.filter((agent) =>
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle window resize to adjust visible departments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleDepts(4); // Show 4 departments on large screens
      } else {
        setVisibleDepts(departments.length); // Show all on small screens (scrollable)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [departments.length]);

  const visibleDepartments = departments.slice(deptScrollIndex, deptScrollIndex + visibleDepts);

  const scrollDepts = (direction) => {
    if (direction === 'left' && deptScrollIndex > 0) {
      setDeptScrollIndex(deptScrollIndex - 1);
    } else if (direction === 'right' && deptScrollIndex < departments.length - visibleDepts) {
      setDeptScrollIndex(deptScrollIndex + 1);
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

        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto transition-colors duration-300">
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
                  setCurrentEditIndex(null);
                  setIsModalOpen(true);
                }}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition-colors duration-300"
              >
                Add Account
              </button>
            </div>

            <div className="relative">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="text-gray-500 border-b">
                    <tr>
                      <th className="py-2 px-3 pl-3 sticky left-0 bg-white z-10">
                        Username
                      </th>
                      <th className="py-2 px-3 text-center sticky left-36 bg-white z-10">
                        Active
                      </th>
                      <th
                        className="py-2 px-3 text-center relative"
                        colSpan={visibleDepts}
                      >
                        Departments
                        {departments.length > visibleDepts && (
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex gap-1">
                            <button 
                              onClick={() => scrollDepts('left')}
                              disabled={deptScrollIndex === 0}
                              className={`p-1 rounded ${deptScrollIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button 
                              onClick={() => scrollDepts('right')}
                              disabled={deptScrollIndex >= departments.length - visibleDepts}
                              className={`p-1 rounded ${deptScrollIndex >= departments.length - visibleDepts ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        )}
                      </th>
                    </tr>
                  </thead>
                </table>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead>
                      <tr>
                        <th className="sticky left-0 bg-white z-10 w-36"></th>
                        <th className="sticky left-36 bg-white z-10 w-20"></th>
                        {visibleDepartments.map((dept, i) => (
                          <th
                            key={i}
                            className="w-36 text-center px-2 shrink-0 font-medium"
                          >
                            {dept}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAgents.map((agent, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-2 px-3 sticky left-0 bg-white z-10 w-36 flex items-center gap-2">
                            {agent.username}
                            <Edit3
                              size={18}
                              strokeWidth={1}
                              className="text-gray-500 cursor-pointer hover:text-purple-700"
                              onClick={() => {
                                setCurrentEditIndex(idx);
                                setEditUsername(agent.username);
                                setEditPassword(agent.password);
                                setIsModalOpen(true);
                              }}
                            />
                          </td>
                          <td className="py-2 px-3 text-center sticky left-36 bg-white z-10 w-20">
                            <label className="inline-flex relative items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={agent.active}
                                onChange={() =>
                                  setAgents((prev) =>
                                    prev.map((a, i) =>
                                      i === idx
                                        ? { ...a, active: !a.active }
                                        : a
                                    )
                                  )
                                }
                              />
                              <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition-colors duration-300 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform peer-checked:after:translate-x-3" />
                            </label>
                          </td>
                          {visibleDepartments.map((dept, i) => (
                            <td key={i} className="w-36 text-center px-2 shrink-0">
                              <input
                                type="checkbox"
                                checked={agent.departments.includes(dept)}
                                onChange={() => {
                                  const updated = agent.departments.includes(dept)
                                    ? agent.departments.filter((d) => d !== dept)
                                    : [...agent.departments, dept];

                                  setAgents((prev) =>
                                    prev.map((a, index) =>
                                      index === idx
                                        ? { ...a, departments: updated }
                                        : a
                                    )
                                  );
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Add/Edit */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-400/50 flex justify-center items-center z-50 transition-opacity duration-300">
              <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform scale-95 animate-fadeIn transition-transform duration-300 ease-out">
                <h2 className="text-md font-semibold mb-4">
                  {currentEditIndex !== null ? "Edit Agent" : "Add Agent"}
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
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm mb-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                />

                <div className="flex justify-end gap-2">
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
                            departments: [],
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