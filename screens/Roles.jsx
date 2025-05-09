import React, { useState, useEffect } from "react";
import { Edit3, Search, X } from "react-feather";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";

const initialRoles = [
  {
    name: "Admin",
    active: true,
    permissions: [
      "Can view Queues",
      "Can Reply",
      "Can view Chats",
      "Can End Chat",
      "Can Transfer Department",
      "Can view Macros",
      "Can send Macros",
      "Can view Department",
      "Can Edit Department",
      "Can Assign Department",
      "Can Add Department",
      "Can Manage Profile",
      "Can View Auto-Replies",
      "Can Edit Auto-Replies",
      "Can Add Auto-Replies",
      "Can view Admin",
      "Can Edit Admin Accounts",
      "Can Add Admin Accounts",
      "Can view Roles",
      "Can Edit Roles",
      "Can Assign Roles",
      "Can Add Roles",
      "Can View Manage Agents",
    ],
  },
  {
    name: "Client",
    active: true,
    permissions: ["Can view Queues", "Can view Chats", "Can View Auto-Replies"],
  },
  {
    name: "Agent",
    active: true,
    permissions: [
      "Can view Queues",
      "Can Reply",
      "Can view Chats",
      "Can End Chat",
      "Can Transfer Department",
      "Can view Macros",
      "Can send Macros",
      "Can View Auto-Replies",
      "Can Manage Profile",
    ],
  },
  {
    name: "Supervisor",
    active: true,
    permissions: [
      "Can view Queues",
      "Can Reply",
      "Can view Chats",
      "Can End Chat",
      "Can Transfer Department",
      "Can view Macros",
      "Can send Macros",
      "Can view Department",
      "Can Edit Department",
      "Can Assign Department",
      "Can View Auto-Replies",
      "Can Edit Auto-Replies",
      "Can Manage Profile",
      "Can View Manage Agents",
    ],
  },
];

const permissions = [
  "Can view Queues",
  "Can Reply",
  "Can view Chats",
  "Can End Chat",
  "Can Transfer Department",
  "Can view Macros",
  "Can send Macros",
  "Can view Department",
  "Can Edit Department",
  "Can Assign Department",
  "Can Add Department",
  "Can Manage Profile",
  "Can View Auto-Replies",
  "Can Edit Auto-Replies",
  "Can Add Auto-Replies",
  "Can view Admin",
  "Can Edit Admin Accounts",
  "Can Add Admin Accounts",
  "Can view Roles",
  "Can Edit Roles",
  "Can Assign Roles",
  "Can Add Roles",
  "Can View Manage Agents",
];

export default function ManageRoles() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: "" });

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const handleOpenEditModal = (index = null) => {
    setCurrentEditIndex(index);
    setEditForm({
      name: index !== null ? roles[index].name : "",
    });
    setIsModalOpen(true);
  };

  const handleSaveRole = () => {
    if (currentEditIndex !== null) {
      setRoles((prev) =>
        prev.map((role, i) =>
          i === currentEditIndex ? { ...role, name: editForm.name } : role
        )
      );
    } else {
      setRoles((prev) => [
        ...prev,
        {
          name: editForm.name,
          active: true,
          permissions: [],
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (index) => {
    setRoles((prev) =>
      prev.map((role, i) =>
        i === index ? { ...role, active: !role.active } : role
      )
    );
  };

  const handleTogglePermission = (roleIndex, permission) => {
    setRoles((prev) =>
      prev.map((role, i) => {
        if (i !== roleIndex) return role;

        const updatedPermissions = role.permissions.includes(permission)
          ? role.permissions.filter((p) => p !== permission)
          : [...role.permissions, permission];

        return { ...role, permissions: updatedPermissions };
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
        <main className="flex-1 bg-gray-100 p-15 overflow-y-auto transition-colors duration-300">
          <div className="bg-white p-4 rounded-lg min-h-[80vh] transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search roles..."
              />
              <button
                onClick={() => handleOpenEditModal()}
                className="bg-[#6237A0] text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition-colors duration-300"
              >
                Add Role
              </button>
            </div>
            <div className="overflow-x-auto ">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-white border-b text-gray-500">
                  <tr>
                    <th className="sticky left-0 z-30 bg-white py-2 px-3 w-48">
                      Role Name
                    </th>
                    <th className="sticky left-[12rem] z-30 bg-white py-2 px-3 text-center w-24">
                      Active Status
                    </th>
                    {permissions.map((perm, i) => (
                      <th
                        key={i}
                        className="py-2 px-3 text-center min-w-[120px]"
                      >
                        {perm}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRoles.map((role, idx) => (
                    <tr key={idx} className="bg-white ">
                      <td className="align-top w-100 sticky left-0 bg-white py-3 px-3 z-10">
                        <div className="relative min-w-[180px] max-w-[180px] pr-6">
                          <span className="break-words whitespace-normal text-sm block">
                            {role.name}
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
                          checked={role.active}
                          onChange={() => handleToggleActive(idx)}
                        />
                      </td>
                      {permissions.map((perm, i) => (
                        <td key={i} className="py-3 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={role.permissions.includes(perm)}
                            onChange={() => handleTogglePermission(idx, perm)}
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

          {isModalOpen && (
            <RoleModal
              isEdit={currentEditIndex !== null}
              formData={editForm}
              onFormChange={setEditForm}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveRole}
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
      <Search
        size={18}
        strokeWidth={1}
        className="text-gray-500 mr-2 flex-shrink-0"
      />
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

function RoleModal({ isEdit, formData, onFormChange, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-gray-400/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-md font-semibold mb-4">
          {isEdit ? "Edit Role" : "Add Role"}
        </h2>

        <FormField
          label="Role Name"
          value={formData.name}
          onChange={(value) => onFormChange({ ...formData, name: value })}
        />

        <div className="flex justify-end gap-2 mt-4">
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

function FormField({ label, type = "text", value, onChange }) {
  return (
    <div>
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
