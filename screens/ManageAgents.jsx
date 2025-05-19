import React, { useState } from "react";
import { Edit3, Search, X, Eye, EyeOff } from "react-feather";
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

  const filteredAgents = agents.filter((agent) =>
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <main className="flex-1 bg-gray-100 p-15 overflow-hidden">
          <div className="bg-white p-4 rounded-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search agents..."
              />
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
                              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
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

          {isModalOpen && (
            <AgentModal
              isEdit={currentEditIndex !== null}
              formData={editForm}
              onFormChange={setEditForm}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveAgent}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}

          {isConfirmModalOpen && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4">Confirm Save</h2>
                <p className="text-sm text-gray-700 mb-6">Are you sure you want to save this agent's details?</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsConfirmModalOpen(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-1 rounded-lg text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSaveAgent}
                    className="bg-purple-700 text-white px-4 py-1 rounded-lg text-sm hover:bg-purple-800"
                  >
                    Confirm
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

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-1/3 relative">
      <Search size={18} strokeWidth={1} className="text-gray-500 mr-2" />
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

function AgentModal({ isEdit, formData, onFormChange, onClose, onSave, showPassword, setShowPassword }) {
  return (
    <div className="fixed inset-0 bg-gray-400/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-md font-semibold mb-4">
          {isEdit ? "Edit Agent" : "Add Agent"}
        </h2>
        <FormField
          label="Username"
          value={formData.username}
          onChange={(value) => onFormChange({ ...formData, username: value })}
        />
        <div className="relative mt-4">
          <label className="text-sm text-gray-700 mb-1 block">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => onFormChange({ ...formData, password: e.target.value })}
            className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-1 rounded-lg text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-purple-700 text-white px-4 py-1 rounded-lg text-sm hover:bg-purple-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-700 mb-1 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
      />
    </div>
  );
}
