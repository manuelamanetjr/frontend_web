import React, { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { Edit3, Search, X } from "react-feather";

export default function Departments() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [departments, setDepartments] = useState([
    { name: "Billing", active: true },
    { name: "Customer Service", active: true },
    { name: "Sales", active: false },
  ]);

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              {/* Search bar */}
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-1/3 relative">
                <Search
                  size={18}
                  className="text-gray-500 mr-2 flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="Search..."
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

              <button
                onClick={() => {
                  setEditText("");
                  setCurrentEditIndex(null);
                  setIsModalOpen(true);
                }}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition-colors duration-300"
              >
                Add Department
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="py-2 px-3 pl-3">Department</th>
                    <th className="py-2 px-3 text-center">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartments.map((dept, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-2 px-3 flex items-center gap-2">
                        {dept.name}
                        <Edit3
                          size={18}
                          className="text-gray-500 cursor-pointer w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200 hover:text-purple-700"
                          onClick={() => {
                            setCurrentEditIndex(idx);
                            setEditText(dept.name);
                            setIsModalOpen(true);
                          }}
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={dept.active}
                            onChange={() =>
                              setDepartments((prev) =>
                                prev.map((d, i) =>
                                  i === idx ? { ...d, active: !d.active } : d
                                )
                              )
                            }
                          />
                          <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition-colors duration-300 relative after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-transform after:duration-300 peer-checked:after:translate-x-4" />
                        </label>
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
                <h2 className="text-md font-semibold mb-2">
                  {currentEditIndex !== null
                    ? "Edit Department"
                    : "Add Department"}
                </h2>
                <label className="text-sm text-gray-700 mb-1 block">
                  Department Name
                </label>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
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
                        setDepartments((prev) =>
                          prev.map((d, i) =>
                            i === currentEditIndex
                              ? { ...d, name: editText }
                              : d
                          )
                        );
                      } else {
                        setDepartments((prev) => [
                          ...prev,
                          { name: editText, active: true },
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
