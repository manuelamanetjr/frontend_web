import React, { useState, useEffect } from "react";
import { Edit3, Search, X, ChevronLeft, ChevronRight } from "react-feather";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";

const initialRoles = [
  {
    name: "Admin",
    active: true,
    permissions: ["View Messages", "Create Account", "Send Messages", "Manage Profile", "Use Canned Messages", "Manage Auto Reply", "Manage Department"],
  },
  {
    name: "Manager",
    active: true,
    permissions: ["View Messages", "View Profile", "Manage Profile"],
  },
  {
    name: "Support",
    active: false, 
    permissions: ["Create Account", "View Profile", "Manage Profile"],
  },
];

const permissions = ["View Messages", "Send Messages", "View Profile", "Create Account", "Manage Auto Reply", "Manage Department"];

export default function ManageRoles() {
  // State management
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePerms, setVisiblePerms] = useState(4);
  const [permScrollIndex, setPermScrollIndex] = useState(0);
  const [roles, setRoles] = useState(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
  });

  // Derived state
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visiblePermissions = permissions.slice(
    permScrollIndex,
    permScrollIndex + visiblePerms
  );

  // Handlers
  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const handleScrollPerms = (direction) => {
    if (direction === "left" && permScrollIndex > 0) {
      setPermScrollIndex(permScrollIndex - 1);
    } else if (
      direction === "right" &&
      permScrollIndex < permissions.length - visiblePerms
    ) {
      setPermScrollIndex(permScrollIndex + 1);
    }
  };

  const handleOpenEditModal = (index = null) => {
    setCurrentEditIndex(index);
    setEditForm({
      name: index !== null ? roles[index].name : "",
    });
    setIsModalOpen(true);
  };

  const handleSaveRole = () => {
    if (currentEditIndex !== null) {
      // Update existing role
      setRoles((prev) =>
        prev.map((role, i) =>
          i === currentEditIndex
            ? { ...role, name: editForm.name }
            : role
        )
      );
    } else {
      // Add new role
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

  // Effects
  useEffect(() => {
    const handleResize = () => {
      setVisiblePerms(window.innerWidth >= 1280 ? 4 : permissions.length);
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
            {/* Search and Add Button */}
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

            {/* Roles Table */}
            <div className="relative">
              <RolesTable
                roles={filteredRoles}
                visiblePermissions={visiblePermissions}
                permissions={permissions}
                visiblePerms={visiblePerms}
                permScrollIndex={permScrollIndex}
                onScrollPerms={handleScrollPerms}
                onEdit={handleOpenEditModal}
                onToggleActive={handleToggleActive}
                onTogglePermission={handleTogglePermission}
              />
            </div>
          </div>

          {/* Edit/Add Modal */}
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

// Extracted components

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

function RolesTable({
  roles,
  visiblePermissions,
  permissions,
  visiblePerms,
  permScrollIndex,
  onScrollPerms,
  onEdit,
  onToggleActive,
  onTogglePermission,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="text-gray-500 border-b z-20 bg-white">
          <tr className="z-20">
            <th className="py-2 px-3 pl-3 sticky left-0 z-30 bg-white w-48">Role Name</th>
            <th className="py-2 px-3 text-center sticky left-25 z-30 bg-white w-24">Status</th>
            <th className="py-2 px-3 text-center relative" colSpan={visiblePerms}>
              Permissions
              {permissions.length > visiblePerms && (
                <ScrollButtons
                  canScrollLeft={permScrollIndex > 0}
                  canScrollRight={permScrollIndex < permissions.length - visiblePerms}
                  onScrollLeft={() => onScrollPerms("left")}
                  onScrollRight={() => onScrollPerms("right")}
                />
              )}
            </th>
          </tr>
          <tr className="z-20">
            <th className="sticky left-0 bg-white z-30 w-48"></th>
            <th className="sticky left-25 bg-white z-30 w-24"></th>
            {visiblePermissions.map((perm, i) => (
              <th key={i} className="py-2 px-3 text-center font-medium bg-white min-w-[120px]">
                {perm}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {roles.map((role, idx) => (
            <RoleRow
              key={idx}
              role={role}
              visiblePermissions={visiblePermissions}
              onEdit={() => onEdit(idx)}
              onToggleActive={() => onToggleActive(idx)}
              onTogglePermission={(perm) => onTogglePermission(idx, perm)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoleRow({
  role,
  visiblePermissions,
  onEdit,
  onToggleActive,
  onTogglePermission,
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="py-3 px-3 align-top sticky left-0 z-10 bg-white w-100">
        <div className="max-w-[180px] break-words text-gray-800 relative pr-6">
          <span>{role.name}</span>
          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <Edit3
              size={18}
              strokeWidth={1}
              className="text-gray-500 cursor-pointer w-[18px] h-[18px] transition-colors duration-200 hover:text-purple-700"
              onClick={onEdit}
            />
          </div>
        </div>
      </td>
      <td className="py-3 px-3 text-center sticky left-25 z-10 bg-white w-100">
        <ToggleSwitch checked={role.active} onChange={onToggleActive} />
      </td>
      {visiblePermissions.map((perm, i) => (
        <td key={i} className="py-3 px-3 text-center min-w-[120px]">
          <input
            type="checkbox"
            checked={role.permissions.includes(perm)}
            onChange={() => onTogglePermission(perm)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
        </td>
      ))}
    </tr>
  );
}

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="inline-flex relative items-center cursor-pointer z-30">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#6237A0] transition-colors duration-300 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform peer-checked:after:translate-x-3" />
  </label>
);

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

function RoleModal({ isEdit, formData, onFormChange, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-gray-400/50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform scale-95 animate-fadeIn transition-transform duration-300 ease-out">
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