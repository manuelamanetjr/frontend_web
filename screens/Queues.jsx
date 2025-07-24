import React, { useState, useEffect, useRef } from "react";
import { Filter, Send, Menu, MoreVertical } from "react-feather";
import Select from "react-select";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import socket from "../src/socket";

export default function Queues() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [view, setView] = useState("chatList");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showEndChatModal, setShowEndChatModal] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const dropdownRef = useRef(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const [showCannedMessages, setShowCannedMessages] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [endedChats, setEndedChats] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showTransferConfirmModal, setShowTransferConfirmModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Billing");
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [transferDepartment, setTransferDepartment] = useState(null);
  const [isTransferred, setIsTransferred] = useState(false);

    useEffect(() => {
      socket.connect();
      console.log("Socket connected");
  
      return () => {
        socket.disconnect();
        console.log("Socket disconnected");
      };
    }, []);

  const departmentCustomers = {
    Billing: [
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
    ],
    "Technical Support": [
      {
        id: 4,
        name: "Customer 4",
        number: "09123456782",
        time: "9:30 AM",
        profile: "../src/assets/profile/tech1.jpg",
      },
      {
        id: 5,
        name: "Customer 5",
        number: "09123456782",
        time: "9:30 AM",
        profile: "../src/assets/profile/tech2.jpg",
      },
    ],
    Sales: [
      {
        id: 6,
        name: "Customer 6",
        number: "09123456782",
        time: "9:30 AM",
        profile: "../src/assets/profile/sales.jpg",
      },
      {
        id: 7,
        name: "Customer 7",
        number: "09123456782",
        time: "9:30 AM",
        profile: "../src/assets/profile/sales2.jpg",
      },
    ],
    "Customer Service": [
      {
        id: 8,
        name: "Customer 8",
        number: "09123456782",
        time: "9:30 AM",
        profile: "../src/assets/profile/sales3.jpg",
      },
    ],
  };

  const departments = Object.keys(departmentCustomers);
  const departmentOptions = departments.map((dept) => ({
    value: dept,
    label: dept,
  }));

  const cannedMessages = [
    "Can you describe the issue in detail?",
    "Please provide your account number.",
    "Let me check that for you.",
    "Thank you for your patience.",
    "I will escalate this issue to our support team.",
  ];

  const handleTransferClick = () => {
    setOpenDropdown(null);
    setShowTransferModal(true);
    setTransferDepartment(selectedDepartment);
  };

  const handleDepartmentSelect = () => {
    if (transferDepartment) {
      setShowTransferModal(false);
      setShowTransferConfirmModal(true);
    }
  };

  const confirmTransfer = () => {
    setShowTransferConfirmModal(false);
    setIsTransferred(true);
    console.log(`Transferring to ${transferDepartment}`);
    alert(`Customer transferred to ${transferDepartment}`);
  };

  const cancelTransfer = () => {
    setShowTransferModal(false);
    setTransferDepartment(null);
  };

  const cancelTransferConfirm = () => {
    setShowTransferConfirmModal(false);
  };

  const toggleDropdown = (name) => {
    if (chatEnded || isTransferred) return; //prevent clicking on the dropdown when chat is ended or transferred
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleEndChat = () => {
    setOpenDropdown(null);
    setShowEndChatModal(true);
  };

  const confirmEndChat = () => {
    setShowEndChatModal(false); 
    setChatEnded(true);

    const now = new Date();
    const endMessage = {
      id: messages.length + 1,
      sender: "system",
      content: "Thank you for your patience. Your chat has ended.",
      timestamp: now.toISOString(),
      displayTime: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, endMessage]);
 
    if (selectedCustomer) {
      setEndedChats((prev) => [
        ...prev,
        {
          ...selectedCustomer,
          messages: [...messages, endMessage],
          endedAt: now.toISOString(),
        },
      ]);

      setSelectedCustomer(null);
      setMessages([]);
      // navigate back to chat list in mobile view
      if (isMobile) setView("chatList");
    }
  };

  const cancelEndChat = () => {
    setShowEndChatModal(false);
  };

  const formatMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year:
          messageDate.getFullYear() !== today.getFullYear()
            ? "numeric"
            : undefined,
      });
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const sendMessage = () => {
    const trimmedMessage = inputMessage.replace(/\n+$/, "");
    if (trimmedMessage.trim() === "") return;

    const now = new Date();
    const newMessage = {
      sender: "user",
      content: trimmedMessage,
      timestamp: now.toISOString(),
      displayTime: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  const toggleSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".canned-dropdown")) {
        setShowCannedMessages(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const groupMessagesByDate = () => {
    const groupedMessages = [];
    let currentDate = null;

    messages.forEach((message) => {
      const messageDate = formatMessageDate(message.timestamp);

      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groupedMessages.push({
          type: "date",
          content: messageDate,
        });
      }

      groupedMessages.push({
        type: "message",
        ...message,
      });
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChatClick = (customer) => {
    setSelectedCustomer(customer);
    setChatEnded(endedChats.some((chat) => chat.id === customer.id));
    setIsTransferred(false);
    if (isMobile) {
      setView("conversation");
    }
  };

  const handleBackClick = () => {
    setView("chatList");
    setSelectedCustomer(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavbar toggleSidebar={toggleSidebar} />

      {/* End Chat Modal */}
      {showEndChatModal && (
        <div className="fixed inset-0 bg-gray-400/50 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              End Chat
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end this chat session?
            </p>
            <div className="flex justify-center gap-20">
              <button
                onClick={cancelEndChat}
                className="px-5 py-2 border rounded-lg text-white bg-[#BCBCBC] hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmEndChat}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showTransferModal && (
        <div className="fixed inset-0 bg-gray-400/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Transfer Department
            </h3>
            <div className="mb-6">
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Department
              </label>
              <Select
                options={departmentOptions}
                onChange={(selected) => {
                  setTransferDepartment(selected?.value || null);
                  console.log("Selected Department:", selected?.value);
                }}
                value={departmentOptions.find((option) => option.value === transferDepartment) || null}
                classNamePrefix="select"
                placeholder="Select a department"
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#6237A0"
                      : state.isFocused
                      ? "#E6DCF7"
                      : "white",
                    color: state.isSelected ? "white" : "#000000",
                  }),
                  control: (provided) => ({
                    ...provided,
                    borderColor: "#D1D5DB",
                    minHeight: "42px",
                    boxShadow: "none",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#000000",
                  }),
                }}
              />
            </div>
            <div className="flex justify-center gap-20">
              <button
                onClick={() => {
                  cancelTransfer();
                  setTransferDepartment(null);
                }}
                className="px-5 py-2 border rounded-lg text-white bg-[#BCBCBC] hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  if (!transferDepartment || transferDepartment === selectedDepartment) {
                    e.preventDefault();
                    return;
                  }
                  handleDepartmentSelect();
                }}
                disabled={!transferDepartment || transferDepartment === selectedDepartment}
                className={`px-5 py-2 text-white rounded-lg transition-colors ${
                  transferDepartment && transferDepartment !== selectedDepartment
                    ? "bg-[#6237A0] hover:bg-[#4c2b7d]"
                    : "bg-[#6237A0]/50 cursor-not-allowed"
                }`}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}

      {showTransferConfirmModal && (
        <div className="fixed inset-0 bg-gray-400/50 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Transfer
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to transfer this customer to {transferDepartment}?
            </p>
            <div className="flex justify-center gap-20">
              <button
                onClick={cancelTransferConfirm}
                className="px-5 py-2 border rounded-lg text-white bg-[#BCBCBC] hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmTransfer}
                className="px-5 py-2 bg-[#6237A0] text-white rounded-lg hover:bg-[#4c2b7d] transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isMobile={true}
          isOpen={mobileSidebarOpen}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <Sidebar
          isMobile={false}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
        />

        <main className="flex-1 bg-white">
          <div className="flex flex-col md:flex-row h-full">
            {/* Queues list */}
            <div className={`${view === "chatList" ? "block" : "hidden md:block"} w-full md:w-[320px] bg-[#F5F5F5] overflow-y-auto`}>
              <div className="relative p-4 flex text-center justify-between rounded-xl py-2 px-4 items-center m-4 shadow-sm bg-[#E6DCF7]">
                <button
                  className="text-sm text-[#6237A0] w-full text-left focus:outline-none"
                  onClick={() => setShowDeptDropdown((prev) => !prev)}
                >
                  {selectedDepartment}
                </button>
                <button
                  className="text-[#6237A0] hover:text-purple-800 transition"
                  onClick={() => setShowDeptDropdown((prev) => !prev)}
                >
                  <Filter size={16} />
                </button>
                {showDeptDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    {departments.map((dept) => (
                      <div
                        key={dept}
                        className={`px-4 py-2 cursor-pointer hover:bg-[#E6DCF7] ${
                          dept === selectedDepartment
                            ? "font-bold text-[#6237A0]"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedDepartment(dept);
                          setShowDeptDropdown(false);
                          setSelectedCustomer(null);
                          setIsTransferred(false);
                        }}
                      >
                        {dept}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat list */}
              <div className="chat-list overflow-auto">
                {(departmentCustomers[selectedDepartment] || []).map(
                  (customer) => (
                    <div
                      key={customer.id}
                      onClick={() => handleChatClick(customer)}
                      className={`flex items-center justify-between px-4 py-3 border-2 ${
                        selectedCustomer?.id === customer.id
                          ? "bg-[#E6DCF7]"
                          : endedChats.some((chat) => chat.id === customer.id)
                          ? "bg-gray-100 opacity-70"
                          : "bg-[#f5f5f5]"
                      } border-[#E6DCF7] rounded-xl hover:bg-[#E6DCF7] cursor-pointer transition m-2 min-h-[100px]`}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <img
                          src={customer.profile}
                          alt="profile"
                          className="w-15 h-15 rounded-full object-cover"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-end mb-1">
                            <span className="text-[10px] font-semibold text-purple-600 bg-purple-100 px-2 py-[2px] rounded-full whitespace-nowrap">
                              {selectedDepartment}
                            </span>
                          </div>
                          <p
                            className={`text-sm font-medium truncate ${
                              selectedCustomer?.id === customer.id
                                ? "text-[#6237A0]"
                                : endedChats.some(
                                    (chat) => chat.id === customer.id
                                  )
                                ? "text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {customer.name}
                          </p>
                          <div className="flex justify-between items-center">
                            <p
                              className={`text-xs truncate ${
                                selectedCustomer?.id === customer.id
                                  ? "text-[#6237A0]"
                                  : endedChats.some(
                                      (chat) => chat.id === customer.id       
                                    )
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {customer.number}
                            </p>
                            <span className="text-[10px] text-gray-400 ml-2 whitespace-nowrap mt-5">
                              {customer.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Chat area */}
            <div className={`${view === "conversation" ? "block" : "hidden md:flex"} flex-1 flex flex-col`}>
              {selectedCustomer ? (
                <>
                {/* Sticky Header */}
                  <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center">
                      {isMobile && (
                        <button
                          onClick={handleBackClick}
                          className="mr-2 text-gray-600 hover:text-gray-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedCustomer.profile}
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {selectedCustomer.name}
                          </h3>
                        </div>
                      </div>
                      <div className="relative ml-auto">
                        {!chatEnded && !isTransferred &&(
                          <button
                            className="p-2 text-black hover:text-[#6237A0] transition rounded-full"
                            onClick={() => toggleDropdown("customerMenu")}
                          >
                            <MoreVertical size={22} />
                          </button>
                        )}
                        {openDropdown === "customerMenu" && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-44 bg-white border border-gray-300 rounded-md shadow-sm z-20"
                          >
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                              onClick={handleEndChat}
                            >
                              End Chat
                            </button>
                            <div className="border-t border-gray-200" />
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                              onClick={handleTransferClick}
                            >
                              Transfer Department
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-2 auto-hide-scrollbar"
                    style={{ 
       maxHeight: isMobile ? 'calc(100vh - 200px)' : 'none',
       height: isMobile ? 'auto' : '100%'
     }}>
                    <div className="flex flex-col justify-end min-h-full gap-4 pt-4">
                      <>
                        <div className="text-[10px] text-gray-400 text-center flex items-center gap-2 my-2">
                          <div className="flex-grow h-px bg-gray-200" />
                          Today
                          <div className="flex-grow h-px bg-gray-200" />
                        </div>

                        <div className="flex items-end justify-end gap-2">
                          <div className="text-sm text-gray-800 px-4 py-2 rounded-xl self-start max-w-[320px]">
                            To connect you with the right support team, please
                            select one of the following options:
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-1">
                          <img
                            src={selectedCustomer.profile}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="relative bg-[#6237A0] text-white px-4 py-2 ml-7 rounded-br-xl rounded-tr-xl rounded-bl-xl text-sm max-w-[300px]">
                            {selectedDepartment}
                            <div className="text-[10px] text-light text-gray-300 text-right mt-1 ml-2">
                              1:20 PM
                            </div>
                          </div>
                        </div>

                        <div className="flex items-end justify-end gap-2">
                          <div className="text-sm text-gray-800 px-4 py-2 rounded-xl self-start max-w-[320px]">
                            We will be with you in a moment!
                          </div>
                        </div>

                        <div className="text-[10px] text-gray-400 text-center flex items-center gap-2 my-2">
                          <div className="flex-grow h-px bg-gray-200" />
                          You are now chatting with {selectedDepartment} agent
                          <div className="flex-grow h-px bg-gray-200" />
                        </div>

                        <div className="flex flex-col items-end gap-1 self-end">
                          <img
                            src="../src/assets/profile/av3.jpg"
                            alt="agent"
                            className="w-8 h-8 rounded-full"
                          /> 
                          <div className="relative bg-[#f5f5f5] px-3 py-2 rounded-bl-xl rounded-tl-xl rounded-br-xl text-sm max-w-[300px] mr-7 break-words whitespace-pre-wrap">
                            Hi, I'm Maria. How may I help you?
                            <div className="text-[10px] text-right text-gray-400 mt-1">
                              1:20 PM
                            </div>
                            
                          </div>
                        </div>
                      </>
                      
                      {/* Existing messages */}
                      {groupedMessages.map((item, index) => {
                        if (item.type === "date") {
                          return (
                            <div
                              key={`date-${index}`}
                              className="text-[10px] text-gray-400 text-center flex items-center gap-2 my-2"
                            >
                              <div className="flex-grow h-px bg-gray-200" />
                              {item.content}
                              <div className="flex-grow h-px bg-gray-200" />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={`msg-${index}`}
                              className={`flex items-end gap-2 ${
                                item.sender === "user"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              {item.sender !== "user" && (
                                <img
                                  src={
                                    item.sender === "system"
                                      ? "../src/assets/profile/av3.jpg"
                                      : selectedCustomer.profile
                                  }
                                  alt={
                                    item.sender === "system"
                                      ? "agent"
                                      : "customer"
                                  }
                                  className="w-8 h-8 rounded-full"
                                />
                              )}
                              <div
                                className={`${
                                  item.sender === "user"
                                    ? "bg-[#f5f5f5] text-gray-800"
                                    : item.sender === "system"
                                    ? "bg-[#6237A0] text-white"
                                    : "bg-[#f5f5f5] text-gray-800"
                                } px-4 py-2 rounded-xl max-w-[320px] text-sm break-words whitespace-pre-wrap`}
                              >
                                {item.content}
                                <div
                                  className={`text-[10px] text-right mt-1 ${
                                    item.sender === "system"
                                      ? "text-gray-300"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {item.displayTime}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}

                      {/* Chat ended system message */}
                      {chatEnded && (
                        <div className="text-[10px] text-gray-400 text-center flex items-center gap-2 my-2">
                          <div className="flex-grow h-px bg-gray-200" />
                          Chat has ended
                          <div className="flex-grow h-px bg-gray-200" />
                        </div>
                      )}
                      <div ref={bottomRef} />
                    </div>
                     {/* Chat ended system message */}
                      {transferDepartment&& (
                        <div className="text-[10px] text-gray-400 text-center flex items-center gap-2 my-2">
                          <div className="flex-grow h-px bg-gray-200" />
                         You have been transferred to {transferDepartment}
                          <div className="flex-grow h-px bg-gray-200" />
                        </div>
                      )}
                      <div ref={bottomRef} />
                    </div>
                 
            


                   

                  {/* Message input area */}
                  {showCannedMessages ? (
                    <div className="border-t border-gray-200 pt-4 bg-white canned-dropdown">
                      <div className="flex items-center gap-2 px-4 pb-3">
                        <button
                          className="p-3 text-[#5C2E90] hover:bg-gray-100 rounded-full"
                          onClick={() => setShowCannedMessages(false)}
                        >
                          <Menu size={20} />
                        </button>
                        <textarea
                          ref={textareaRef}
                          rows={1}
                          placeholder="Message"
                          value={inputMessage}
                          onChange={handleInputChange}
                          onClick={() => setShowCannedMessages(false)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                          className="flex-1 bg-[#F2F0F0] rounded-xl px-4 py-2 leading-tight focus:outline-none text-gray-800 resize-none overflow-y-auto"
                          style={{maxHeight: "100px"}}
                        />
                        <button
                          className="p-2 text-[#5C2E90] hover:bg-gray-100 rounded-full"
                          onClick={sendMessage}
                        >
                          <Send size={20} className="transform rotate-45" />
                        </button>
                      </div>
                      
                      {/* CANNED MESSAGES */}
                      <div className="px-4 pt-3">
                        <div className="grid grid-cols-1 gap-2 pb-3 max-h-[200px] overflow-y-auto">
                          {cannedMessages.map((msg, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setInputMessage(msg);
                                setShowCannedMessages(false);
                              }}
                              className="text-sm text-left px-4 py-3 bg-[#F5F5F5] rounded-xl hover:bg-[#EFEAFE] transition text-gray-800"
                            >
                              {msg}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4 px-4">
                      <button
                        className={`p-2 mb-4 text-[#5C2E90] hover:bg-gray-100 rounded-full
                           ${chatEnded || isTransferred
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-[#5C2E90] hover:bg-gray-100"
                          }`}
                        onClick={() => setShowCannedMessages(true)}
                        disabled={chatEnded || isTransferred}
                      >
                        <Menu size={20} />
                      </button>
                      <textarea
                        ref={textareaRef}
                        rows={1}
                        placeholder={chatEnded || isTransferred ? "Message" : "Message"}
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !chatEnded && !isTransferred) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        className={`flex-1 bg-[#F2F0F0] rounded-xl px-4 py-2 mb-4 leading-tight focus:outline-none text-gray-800 resize-none overflow-y-auto
                        ${chatEnded || isTransferred
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#F2F0F0] text-gray-800"
                        }`}
                        style={{ maxHeight: "100px" }}
                        disabled={chatEnded || isTransferred}
                      />
                      <button
                        className={`p-2 mb-4 text-[#5C2E90] hover:bg-gray-100 rounded-full
                          ${chatEnded || isTransferred
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-[#5C2E90] hover:bg-gray-100"
                          }`}
                        onClick={sendMessage}
                        disabled={chatEnded || isTransferred}
                      >
                        <Send size={20} className="transform rotate-45" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-gray-400">
                    {endedChats.length > 0
                      ? "Select a customer to start a new chat"
                      : "Select a customer to view chat"}
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