import React, { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { FiLogOut } from "react-icons/fi";
import { Upload } from 'react-feather';  // Import Feather icon

export default function Profile() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [fileName, setFileName] = useState('Upload Image');  // State to track file name
  const [profilePicture, setProfilePicture] = useState("https://randomuser.me/api/portraits/women/44.jpg");  // Default profile picture
  const [imageUploaded, setImageUploaded] = useState(false);  // State to track if an image is uploaded

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);  // Update file name state
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);  // Set the profile picture to the uploaded image
        setImageUploaded(true);  // Set imageUploaded to true once an image is uploaded
      };
      reader.readAsDataURL(file);  // Read the image file as a data URL
    } else {
      setFileName('Upload Image');  // Reset to default text if no file
      setProfilePicture("https://randomuser.me/api/portraits/women/44.jpg");  // Reset profile picture
      setImageUploaded(false);  // Reset imageUploaded state
    }
  };

  const handleSave = () => {
    // Logic to save the image (e.g., upload to server)
    console.log("Image saved:", profilePicture);  // Just log for now
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* Top Navbar */}
      <TopNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebars */}
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

        {/* Main Content */}
        <main className="flex-1 bg-[#f6f7fb] p-6 min-h-[calc(100vh-64px)] flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold mb-6">Profile</h1>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-4xl flex flex-col items-center sm:flex-row sm:items-center sm:space-x-10">
            {/* Profile Avatar */}
            <div className="flex flex-col items-center">
              <img
                src={profilePicture}  // Dynamically set the profile picture
                alt="Profile Avatar"
                className="w-64 h-64 rounded-full object-cover mb-4"
              />
              
              {/* Transparent Textbox with file input */}
              <div className="relative w-full max-w-xs">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="w-full p-2 bg-transparent border border-gray-300 rounded-md cursor-pointer flex items-center justify-center"
                >
                  <span className="text-gray-700 text-xs flex-1 text-center">{fileName}</span> {/* Centered text */}
                  <Upload className="w-3 h-3 ml-2" strokeWidth={1} /> {/* Feather upload icon with 1 stroke, on the right */}
                </label>
              </div>

              {/* Conditionally render the Save button */}
              {imageUploaded && (
                <div className="mt-4">
                  <button
                    onClick={handleSave}
                    className="text-purple-600 hover:underline"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 mt-8 sm:mt-0 flex flex-col items-center">
              <div className="grid grid-cols-1 gap-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-500">Name</p>
                  <p className="text-base font-regular text-gray-800">Maria Dela Cruz</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Date of Birth</p>
                  <p className="text-base text-gray-800">_____________________________________</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Email</p>
                  <p className="text-base text-gray-800">_____________________________________</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Address</p>
                  <p className="text-base text-gray-800">_____________________________________</p>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mt-6">
                <button className="flex items-center px-4 py-2 border border-purple-500 text-purple-600 rounded-md hover:bg-purple-50 transition">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Logout link */}
          <div className="mt-10">
            <button className="text-purple-600 hover:underline flex items-center text-sm">
              <FiLogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
