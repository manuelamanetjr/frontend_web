import React, { useState, useEffect, useRef } from "react";
import { Filter } from "react-feather";
import { Send } from "react-feather";
import { Menu } from "react-feather";
import { MoreVertical } from "react-feather";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";

export default function Queues() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const bottomRef = useRef(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };
  const sendMessage = () => {
    if (inputMessage.trim() === "") return; // Ignore empty messages

    const newMessage = {
      sender: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage(""); // Clear input
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

  //Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Check if the click is outside the dropdown
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                        <p
                          className={`text-sm font-medium ${
                            selectedCustomer?.id === customer.id
                              ? "text-[#6237A0]"
                              : "text-gray-800"
                          }`}
                        >
                          {customer.name}
                        </p>
                        <p
                          className={`text-xs ${
                            selectedCustomer?.id === customer.id
                              ? "text-[#6237A0]"
                              : "text-gray-500"
                          }`}
                        >
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
                  <div className="border-b pb-2 text-[#CECECE]">
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
                      <div className="relative ml-auto">
                        <button
                          className="p-2 text-black hover:text-[#6237A0] transition rounded-full"
                          onClick={() => toggleDropdown("customerMenu")}
                        >
                          <MoreVertical size={22} />
                        </button>
                        {/* Dropdown menu */}
                        {openDropdown === "customerMenu" && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-44 bg-white border border-gray-300 rounded-md shadow-sm z-20"
                          >
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                              onClick={() => {
                                console.log("End Chat clicked");
                                setOpenDropdown(null);
                              }}
                            >
                              End Chat
                            </button>
                            <div className="border-t border-gray-200" />
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                              onClick={() => {
                                console.log("Transfer Department clicked");
                                setOpenDropdown(null);
                              }}
                            >
                              Transfer Department
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-2 auto-hide-scrollbar">
                    <div className="flex flex-col justify-end min-h-full gap-4 pt-4">
                      
                        <div className="flex items-end justify-end gap-2">
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
                      {/* Dynamic chat messages */}
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className="flex items-end justify-end gap-2"
                        >
                          <div className="bg-[#f5f5f5] text-gray-800 px-4 py-2 rounded-xl max-w-[320px] text-sm">
                            {msg.content}
                            <div className="text-[10px] text-right text-gray-400 mt-1">
                              {msg.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Auto scroll anchor */}
                      <div ref={bottomRef} />
                    </div>
                  </div>

                  {/* Message input area*/}
                  <div className="mt-4 flex items-center gap-2 border-t pt-4 text-[#CECECE]">
                    <button className="p-2 text-[#5C2E90]">
                      <Menu size={20} />
                    </button>
                    <input
                      type="text"
                      placeholder="Message"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendMessage();
                        }
                      }}
                      className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none text-black"
                    />
                    <button
                      className="p-2 text-[#5C2E90]"
                      onClick={sendMessage}
                    >
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
