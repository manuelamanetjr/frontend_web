import React, { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { Edit } from "react-feather";

export default function AutoReplies() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  const [replies, setReplies] = useState([
    { text: "How can I assist you today?", active: true, department: "Billing" },
    { text: "Can you describe the issue in more detail?", active: true, department: "Customer Support" },
    { text: "Do you have the model number or serial number of the product?", active: false, department: "Sales" },
    { text: "What is your account number or username?", active: true, department: "All" },
  ]);

  const departments = ["Billing", "Customer Support", "Sales", "All"];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isMobile={true} isOpen={mobileSidebarOpen} toggleDropdown={setOpenDropdown} openDropdown={openDropdown} />
        <Sidebar isMobile={false} toggleDropdown={setOpenDropdown} openDropdown={openDropdown} />

        <main className="flex-1 bg-gray-100 p-15 overflow-auto">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-md px-3 py-1 w-1/3 text-sm"
              />
              <button className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800">
                Add Message
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="py-2 px-3">Replies</th>
                    <th className="py-2 px-3">Active</th>
                    <th className="py-2 px-3">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {replies.map((reply, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-2 px-3 flex items-center gap-2">
                        {reply.text}
                        <Edit size={18} className="text-gray-500 cursor-pointer" />
                      </td>
                      <td className="py-2 px-3">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={reply.active}
                            onChange={() =>
                              setReplies((prev) =>
                                prev.map((r, i) =>
                                  i === idx ? { ...r, active: !r.active } : r
                                )
                              )
                            }
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-600 transition-all after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                        </label>
                      </td>
                      <td className="py-2 px-3">
                        <select
                          className="border rounded-md px-2 py-1 text-sm"
                          value={reply.department}
                          onChange={(e) =>
                            setReplies((prev) =>
                              prev.map((r, i) =>
                                i === idx ? { ...r, department: e.target.value } : r
                              )
                            )
                          }
                        >
                          {departments.map((dept, i) => (
                            <option key={i} value={dept}>
                              {dept}
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
