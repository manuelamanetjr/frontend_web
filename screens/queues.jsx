import React, { useState } from "react";
import { Filter } from "react-feather";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";

export default function Queues() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  const customers = [
    {
      id: 1,
      name: "Customer 1",
      number: "09123456789",
      time: "9:00 AM",
      profile: "../src/assets/profile/client.jpg",
    },
    {
      id: 2,
      name: "Customer 2",
      number: "09123456780",
      time: "10:00 AM",
      profile: "../src/assets/profile/character.jpg",
    },
    {
      id: 3,
      name: "Customer 3",
      number: "09123456781",
      time: "11:11 AM",
      profile: "../src/assets/profile/download.jpg",
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isMobile={true}
          isOpen={mobileSidebarOpen}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
        />

        <Sidebar
          isMobile={false}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
        />

        <main className="flex-1 bg-white">
          <div className="flex flex-col md:flex-row h-full">
            {/* Queues list */}

            <div className="w-full md:w-[320px] bg-[#F5F5F5] overflow-y-auto">
              <div className="p-4  flex text-center justify-between rounded-xl py-2 px-4 items-center m-4 shadow-sm bg-[#E6DCF7]">
                <span className="text-sm text-[#6237A0] w-full">Billing</span>
                <button className="text-[#6237A0] hover:text-purple-800 transition">
                  <Filter size={16} />
                </button>
              </div>

              <div>
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between px-4 py-3 border-2 border-[#E6DCF7] rounded-xl bg-[#f5f5f5] hover:bg-[#E6DCF7] cursor-pointer transition m-2 min-h-[100px]"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={customer.profile}
                        alt="profile"
                        className="w-19 h-19 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {customer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {customer.number}
                        </p>
                      </div>
                    </div>

                    {/* Right section: Billing and Time */}
                    <div className="flex flex-col justify-between items-end h-full">
                      {/* Billing Label */}
                      <span className="text-[10px] font-semibold text-purple-600 bg-purple-100 px-2 py-[2px] rounded-full mb-4">
                        Billing
                      </span>

                      {/* Time */}
                      <span className="text-[10px] text-gray-400">
                        {customer.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat content placeholder */}
            <div className="flex-1 bg-white hidden md:block">
              {/* Main chat content can go here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
