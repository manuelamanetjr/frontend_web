export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#5D2CA1]">
            <div className="bg-white rounded-xl shadow-lg flex w-full max-w-4xl overflow-hidden">
                {/* Left side - Login form */}
                <div className="w-full md:w-1/2 p-10">
                    <h2 className="text-3xl font-bold mb-2 mr-40">Welcome back</h2>
                    <p className="text-gray-600 mb-6 mr-45">Please enter your details</p>
 
                        <div className="space-y-4">
                            <div className="space-y-2">
                            <label className="text-sm font-bold text-black">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-bold text-black mr-40 mb-0">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <div className="text-right">
                                    <a href="#" className="text-sm text-purple-800 hover:text-gray-500">
                                        Forgot password
                                    </a>
                                </div>
                            </div>

                            <button
                                className="w-full bg-purple-900 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md transition"
                                onClick={() => alert('Login clicked')}
                            >
                                Login
                            </button>
                        </div>
                   
                </div>

                {/* Right side - Logo */}
                <div className="w-1/2 bg-gray-50 flex items-center justify-center p-10">
                    <div className="flex items-center">
                        {/* Image */}
                        <img src="./src/assets/images/icon.png" alt="Logo" className="w-50 h-50  mr-0" />
                        <span className=" font-baloo text-5xl font-medium text-purple-800 ">servana</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

"hello world"
