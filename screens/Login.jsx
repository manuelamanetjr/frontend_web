import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/queues');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#6237A0] p-4">
            <div className="w-full max-w-[1200px] bg-white rounded-lg overflow-hidden shadow-xl flex flex-col-reverse md:flex-row min-h-[700px]">
                
                {/* Left side - Login form */}
                <div className="w-full md:w-2/5 p-8 sm:p-10 flex items-center justify-center">
                    <div className="w-full space-y-6 max-w-md">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-black-100">Welcome back</h1>
                            <p className="text-gray-500 text-sm text-black-50">Please enter your details</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-black">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block font-medium text-sm text-black">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <div className="text-right">
                                    <a href="#" className="text-sm text-[#6237A0] hover:underline">
                                        Forgot password
                                    </a>
                                </div>
                            </div>

                            <button
                                className="w-full bg-[#6237A0] hover:bg-[#5C2E90] text-white font-semibold py-2 px-4 rounded-md transition"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side - Logo (appears on top on mobile) */}
                <div className="w-full md:w-3/5 bg-gray-50 flex items-center justify-center p-10 sm:p-20">
                    <div className="flex flex-col items-center md:flex-row">
                        <img 
                            src="src/assets/images/icon.png" 
                            alt="Servana Logo" 
                            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 md:mb-0 md:mr-4"
                        />
                        <span className="text-5xl sm:text-6xl font-medium text-[#6237A0] font-baloo text-center md:text-left">servana</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
