import React, { useState, useEffect } from "react";
import { Edit3, Search, X, ChevronLeft, ChevronRight } from "react-feather";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";

const initialAgents = [
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
];

const departments = ["CSR", "Billing", "Sales", "Tech Support", "Admin", "HR"];

export default function ManageAgents() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleDepts, setVisibleDepts] = useState(4);
  const [deptScrollIndex, setDeptScrollIndex] = useState(0);
  const [agents, setAgents] = useState(initialAgents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    password: "",
  });

  const filteredAgents = agents.filter((agent) =>
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visibleDepartments = departments.slice(
    deptScrollIndex,
    deptScrollIndex + visibleDepts
  );

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const handleScrollDepts = (direction) => {
    if (direction === "left" && deptScrollIndex > 0) {
      setDeptScrollIndex(deptScrollIndex - 1);
    } else if (
      direction === "right" &&
      deptScrollIndex < departments.length - visibleDepts
    ) {
      setDeptScrollIndex(deptScrollIndex + 1);
    }
  };

  const handleOpenEditModal = (index = null) => {
    setCurrentEditIndex(index);
    setEditForm({
      username: index !== null ? agents[index].username : "",
      password: index !== null ? agents[index].password : "",
    });
    setIsModalOpen(true);
  };

  const handleSaveAgent = () => {
    if (currentEditIndex !== null) {
      setAgents((prev) =>
        prev.map((agent, i) =>
          i === currentEditIndex
            ? { ...agent, username: editForm.username, password: editForm.password }
            : agent
        )
      );
    } else {
      setAgents((prev) => [
        ...prev,
        {
          username: editForm.username,
          password: editForm.password,
          active: true,
          departments: [],
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (index) => {
    setAgents((prev) =>
      prev.map((agent, i) =>
        i === index ? { ...agent, active: !agent.active } : agent
      )
    );
  };

  const handleToggleDepartment = (agentIndex, department) => {
    setAgents((prev) =>
      prev.map((agent, i) => {
        if (i !== agentIndex) return agent;
        const updatedDepartments = agent.departments.includes(department)
          ? agent.departments.filter((d) => d !== department)
          : [...agent.departments, department];
        return { ...agent, departments: updatedDepartments };
      })
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleDepts(window.innerWidth >= 1280 ? 4 : departments.length);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isMobile
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
            {/* Search and Add Button */}
            <div className="flex justify-between items-center mb-4">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search usernames..."
              />
              <button
                onClick={() => handleOpenEditModal()}
                className="bg-[#6237A0] text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition-colors duration-300"
              >
                Add Account
              </button>
            </div>

            {/* Agents Table */}
            <div className="relative">
              <AgentsTable
                agents={filteredAgents}
                visibleDepartments={visibleDepartments}
                departments={departments}
                visibleDepts={visibleDepts}
                deptScrollIndex={deptScrollIndex}
                onScrollDepts={handleScrollDepts}
                onEdit={handleOpenEditModal}
                onToggleActive={handleToggleActive}
                onToggleDepartment={handleToggleDepartment}
              />
            </div>
          </div>

          {/* Edit/Add Modal */}
          {isModalOpen && (
            <AgentModal
              isEdit={currentEditIndex !== null}
              formData={editForm}
              onFormChange={setEditForm}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveAgent}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-1/3 relative">
      <Search size={18} strokeWidth={1} className="text-gray-500 mr-2 flex-shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent focus:outline-none text-sm w-full pr-6"
      />
      {value && (
        <X
          size={16}
          strokeWidth={1}
          className="text-gray-500 cursor-pointer absolute right-3"
          onClick={() => onChange("")}
        />
      )}
    </div>
  );
}

function AgentsTable({
  agents,
  visibleDepartments,
  departments,
  visibleDepts,
  deptScrollIndex,
  onScrollDepts,
  onEdit,
  onToggleActive,
  onToggleDepartment,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="text-gray-500 border-b bg-white">
          <tr>
            <th className="py-2 px-3 pl-3 sticky left-0 bg-white z-10">Username</th>
            <th className="py-2 px-3 text-center sticky left-30 bg-white z-10">
              Active Status
            </th>
            <th className="py-2 px-3 text-center relative" colSpan={visibleDepts}>
              Departments
              {departments.length > visibleDepts && (
                <ScrollButtons
                  canScrollLeft={deptScrollIndex > 0}
                  canScrollRight={deptScrollIndex < departments.length - visibleDepts}
                  onScrollLeft={() => onScrollDepts("left")}
                  onScrollRight={() => onScrollDepts("right")}
                />
              )}
            </th>
          </tr>
          <tr>
            <th className="sticky left-0 bg-white z-10 w-36"></th>
            <th className="sticky left-30 bg-white z-10 w-20"></th>
            {visibleDepartments.map((dept, i) => (
              <th key={i} className="w-36 text-center px-2 shrink-0 font-medium">
                {dept}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, idx) => (
            <tr key={idx} className="transition-colors duration-200 group">
              <td className="py-3 px-3 align-top sticky left-0 z-10 bg-white w-100">
              <div className="max-w-[180px] break-words text-gray-800 relative pr-6">
                <span>{agent.username}</span>
                <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <Edit3
                  size={18}
                  strokeWidth={1}
                  className="text-gray-500 cursor-pointer hover:text-purple-700"
                  onClick={() => onEdit(idx)}
                />
                </div>
                </div>
              </td>
              <td className="py-2 px-3 text-center sticky left-30 z-10 bg-white w-100">
                <ToggleSwitch checked={agent.active} onChange={() => onToggleActive(idx)} />
              </td>
              {visibleDepartments.map((dept, i) => (
                <td key={i} className="w-36 text-center px-2 shrink-0">
                  <input
                    type="checkbox"
                    checked={agent.departments.includes(dept)}
                    onChange={() => onToggleDepartment(idx, dept)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

function ScrollButtons({ canScrollLeft, canScrollRight, onScrollLeft, onScrollRight }) {
  return (
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex gap-1">
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={`p-1 rounded ${!canScrollLeft ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={`p-1 rounded ${!canScrollRight ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function AgentModal({ isEdit, formData, onFormChange, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-gray-400/50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform scale-95 animate-fadeIn transition-transform duration-300 ease-out">
        <h2 className="text-md font-semibold mb-4">
          {isEdit ? "Edit Agent" : "Add Agent"}
        </h2>

        <FormField
          label="Username"
          value={formData.username}
          onChange={(value) => onFormChange({ ...formData, username: value })}
        />
        <FormField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => onFormChange({ ...formData, password: value })}
          className="mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-1 rounded-lg text-sm hover:bg-gray-400 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-purple-700 text-white px-4 py-1 rounded-lg text-sm hover:bg-purple-800 transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, type = "text", value, onChange, className = "" }) {
  return (
    <div className={className}>
      <label className="text-sm text-gray-700 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
      />
    </div>
  );
}

