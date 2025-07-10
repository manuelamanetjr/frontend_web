import React, { useState, useEffect, useRef } from "react";
import { Edit3, Search, X, Eye, EyeOff, Filter } from "react-feather";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import "../src/App.css";

const initialAgents = [
  { username: "alicego", password: "password123", active: true, departments: ["CSR", "Billing"] },
  { username: "bobmarlie", password: "bobpass", active: true, departments: ["Sales"] },
  { username: "charliechaplin", password: "charlie123", active: false, departments: ["Technical Support", "IT"] },
  { username: "danabells", password: "dana456", active: true, departments: ["Customer Success", "Onboarding"] },
  { username: "evanovich", password: "evan789", active: true, departments: ["Product", "Quality Assurance"] },
  { username: "fionashrek", password: "fiona999", active: false, departments: ["Legal", "Finance"] },
  { username: "georgewashington", password: "gkim321", active: true, departments: ["Retention", "Marketing"] },
  { username: "hannahmontana", password: "hannahpass", active: true, departments: ["Human Resources", "Billing"] },
];

const allDepartments = [
  "CSR", "Billing", "Sales", "Technical Support", "Customer Success", "Retention", "Onboarding",
  "Product", "Quality Assurance", "IT", "Logistics", "Marketing", "Legal", "Finance", "Human Resources"
];

export default function ManageAgents() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState(initialAgents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // New states for filter dropdown and selected filters
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedDepartmentsFilter, setSelectedDepartmentsFilter] = useState([]);

  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterDropdownOpen(false);
      }
    }
    if (filterDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterDropdownOpen]);

const filteredAgents = agents.filter((agent) => {
  const matchesSearch = agent.username.toLowerCase().includes(searchQuery.toLowerCase());

  // If no departments are selected, skip department filter
  if (selectedDepartmentsFilter.length === 0) {
    return matchesSearch;
  }

  // Agent must be in all selected departments (AND logic)
  const hasAllDepartments = selectedDepartmentsFilter.every((dept) =>
    agent.departments.includes(dept)
  );

  return matchesSearch && hasAllDepartments;
});

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const handleOpenEditModal = (index = null) => {
    setCurrentEditIndex(index);
    setEditForm(
      index !== null
        ? { username: agents[index].username, password: agents[index].password }
        : { username: "", password: "" }
    );
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleSaveAgent = () => {
    setIsConfirmModalOpen(true);
    setIsModalOpen(false);
  };

  const confirmSaveAgent = () => {
    if (currentEditIndex !== null) {
      setAgents((prev) =>
        prev.map((agent, i) =>
          i === currentEditIndex ? { ...agent, username: editForm.username, password: editForm.password } : agent
        )
      );
    } else {
      setAgents((prev) => [
        ...prev,
        { username: editForm.username, password: editForm.password, active: true, departments: [] },
      ]);
    }
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleToggleActive = (index) => {
    setAgents((prev) =>
      prev.map((agent, i) =>
        i === index ? { ...agent, active: !agent.active } : agent
      )
    );
  };

  const handleToggleDepartment = (agentIndex, dept) => {
    setAgents((prev) =>
      prev.map((agent, i) => {
        if (i !== agentIndex) return agent;
        const updatedDepartments = agent.departments.includes(dept)
          ? agent.departments.filter((d) => d !== dept)
          : [...agent.departments, dept];
        return { ...agent, departments: updatedDepartments };
      })
    );
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
        <main className="flex-1 bg-gray-100 p-15 overflow-hidden relative">
          <div className="bg-white p-4 rounded-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 relative">
              <div className="relative w-1/3" ref={filterRef}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search agents..."
                  onFilterClick={() => setFilterDropdownOpen((prev) => !prev)}
                  filterDropdownOpen={filterDropdownOpen}
                  selectedFilters={selectedDepartmentsFilter}
                />
                {filterDropdownOpen && (
                  <div
                    className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-64 max-h-60 overflow-auto z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2">
                      {allDepartments.map((dept) => (
                        <label key={dept} className="flex items-center gap-2 mb-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedDepartmentsFilter.includes(dept)}
                            onChange={() => {
                              setSelectedDepartmentsFilter((prev) =>
                                prev.includes(dept)
                                  ? prev.filter((d) => d !== dept)
                                  : [...prev, dept]
                              );
                            }}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm">{dept}</span>
                        </label>
                      ))}
                      {selectedDepartmentsFilter.length > 0 && (
                        <button
                          onClick={() => setSelectedDepartmentsFilter([])}
                          className="mt-2 text-sm text-purple-600 hover:underline"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleOpenEditModal()}
                className="bg-[#6237A0] text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800"
              >
                Add Agent
              </button>
            </div>

            <div className="overflow-x-auto flex-1">
              <div className="h-full overflow-y-auto custom-scrollbar">
                <table className="min-w-full text-sm text-left border-separate border-spacing-0">
                  <thead className="text-gray-500 sticky top-0 bg-white z-20 shadow-sm">
                    <tr>
                      <th className="sticky top-0 left-0 z-30 bg-white py-2 px-3 w-48 border-b border-gray-500">
                        Username
                      </th>
                      <th className="sticky left-48 z-30 bg-white py-2 px-3 text-center w-24 border-b border-gray-500">
                        Active Status
                      </th>
                      {allDepartments.map((dept, i) => (
                        <th
                          key={i}
                          className="py-2 px-3 text-center min-w-[120px] border-b border-gray-500 bg-white sticky top-0 z-20"
                        >
                          {dept}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAgents.map((agent, idx) => (
                      <tr key={idx}>
                        <td className="sticky left-0 bg-white py-3 px-3 z-10 w-[192px] min-w-[192px] max-w-[192px]">
                          <div className="relative w-full">
                            <span className="break-words whitespace-normal text-sm block">
                              {agent.username}
                            </span>
                            <Edit3
                              size={18}
                              strokeWidth={1}
                              className="text-gray-500 cursor-pointer hover:text-purple-700 absolute top-1/2 right-1 -translate-y-1/2"
                              onClick={() => handleOpenEditModal(idx)}
                            />
                          </div>
                        </td>
                        <td className="sticky left-[12rem] bg-white py-3 px-3 z-10 text-center">
                          <ToggleSwitch
                            checked={agent.active}
                            onChange={() => handleToggleActive(idx)}
                          />
                        </td>
                        {allDepartments.map((dept, i) => (
                          <td key={i} className="py-3 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={agent.departments.includes(dept)}
                              onChange={() => handleToggleDepartment(idx, dept)}
className="w-4 h-4 cursor-pointer"
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
        </main>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-400/50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-96 relative">
<h2 className="text-xl font-semibold mb-4">
  {currentEditIndex !== null ? "Edit Agent" : "Add Agent"}
</h2>

              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={editForm.password}
                  onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                  className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {showPassword ? (
                  <EyeOff
                    size={18}
                    className="absolute top-3 right-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    size={18}
                    className="absolute top-3 right-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAgent}
                  className="px-4 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Save Modal */}
        {isConfirmModalOpen && (
<div className="fixed inset-0 bg-gray-200/40 z-60 flex justify-center items-center">

            <div className="bg-white rounded-lg p-6 w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Save</h3>
              <p className="mb-6">Are you sure you want to save these changes?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {setIsConfirmModalOpen(false); setIsModalOpen(true)}}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSaveAgent}
                  className="px-4 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ToggleSwitch component for active status
function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#6237A0] transition-colors duration-300 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform peer-checked:after:translate-x-3" />
    </label>
  );
}


// SearchInput component with filter icon and badge count
function SearchInput({ value, onChange, placeholder, onFilterClick, filterDropdownOpen, selectedFilters }) {
  return (
    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full relative">
      <Search size={18} strokeWidth={1} className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent focus:outline-none text-sm w-full pr-12"
      />
      {value && (
        <X
          size={16}
          strokeWidth={1}
          className="text-gray-500 cursor-pointer absolute right-7"
          onClick={() => onChange("")}
        />
      )}
      <Filter
        size={16}
        strokeWidth={1}
        className={`text-gray-500 cursor-pointer absolute right-3 ${filterDropdownOpen ? "text-purple-700" : ""}`}
        onClick={onFilterClick}
      />
      {selectedFilters.length > 0 && (
        <div className="absolute right-8 top-1 text-xs bg-purple-600 text-white rounded-full px-1.5 select-none">
          {selectedFilters.length}
        </div>
      )}
    </div>
  );
}
