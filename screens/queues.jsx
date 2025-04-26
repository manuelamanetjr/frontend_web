import React, { useState } from "react";
import { Filter } from "react-feather";
import { Send } from "react-feather";
import { Menu } from "react-feather";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";

export default function Queues() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
                    onClick={() => setSelectedCustomer(customer)}
                    className={`flex items-center justify-between px-4 py-3 border-2 ${
                      selectedCustomer?.id === customer.id
                        ? "bg-[#E6DCF7]"
                        : "bg-[#f5f5f5]"
                    } border-[#E6DCF7] rounded-xl hover:bg-[#E6DCF7] cursor-pointer transition m-2 min-h-[100px]`}
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
            <div className="flex-1 bg-white hidden md:flex flex-col justify-end p-4 overflow-hidden">
              {selectedCustomer ? (
                <div className="flex flex-col h-full justify-between">
                  {/* User Profile Header - Added this section */}
                  <div className="border-b pb-2 mb-112 text-[#CECECE]">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedCustomer.profile}
                        alt="Customer profile"
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#E6DCF7]"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 text-center">
                          {selectedCustomer.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Chat messages */}
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-full px-4 pb-2">
                    <div className="flex items-end justify-end gap-2">
                      {/* System message */}
                      <div className="text-sm text-gray-800 px-4 py-2 rounded-xl self-start max-w-[320px]">
                        To connect you with the right support team, please
                        select one of the following options:
                      </div>
                    </div>

                    {/* Billing label bubble (left) */}
                    <div className="flex flex-col items-start gap-1">
                      <img
                        src={selectedCustomer.profile}
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="relative bg-[#6237A0] text-white px-4 py-2 ml-7 rounded-br-xl rounded-tr-xl rounded-bl-xl text-sm max-w-[300px]">
                        Billing
                        <div className="text-[10px] text-light text-gray-300 text-right mt-1 ml-2">
                          1:20 PM
                        </div>
                      </div>
                    </div>

                    {/* System follow-up */}
                    <div className="flex items-end justify-end gap-2">
                      <div className="text-sm text-gray-800 px-4 py-2 rounded-xl self-start max-w-[320px]">
                        We will be with you in a moment!
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="text-[10px] text-gray-400 text-center flex items-center gap-2 my-2">
                      <div className="flex-grow h-px bg-gray-200" />
                      You are now chatting with Billing agent
                      <div className="flex-grow h-px bg-gray-200" />
                    </div>

                    {/* Agent reply */}
                    <div className="flex flex-col items-end gap-1 self-end">
                      <img
                        src="../src/assets/profile/av3.jpg"
                        alt="agent"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="relative bg-[#f5f5f5] px-3 py-2 rounded-bl-xl rounded-tl-xl rounded-br-xl text-sm max-w-[300px] mr-7">
                        Hi, I’m Maria. How may I help you?
                        <div className="text-[10px] text-right text-gray-400 mt-1">
                          1:20 PM
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message input area (bottom aligned, optional) */}
                  <div className="mt-4 flex items-center gap-2 border-t pt-4 text-[#CECECE]">
                    <button className="p-2 text-[#5C2E90]">
                      <Menu size={20} />
                    </button>
                    <input
                      type="text"
                      placeholder="Message"
                      className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none text-black"
                    />
                    <button className="p-2 text-[#5C2E90]">
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t text-[#CECECE] py-110">
                  <div className="text-gray-400 text-center">
                    Select a customer to view chat
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
