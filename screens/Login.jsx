export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-700">
            <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-xl flex">
                {/* Left side - Login form */}
                <div className="w-1/2 p-10">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">Welcome back</h1>
                            <p className="text-gray-500 text-sm">Please enter your details</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <div className="text-right">
                                    <a href="#" className="text-sm text-gray-500 hover:text-purple-700">
                                        Forgot password
                                    </a>
                                </div>
                            </div>

                            <button
                                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md transition"
                                onClick={() => alert('Login clicked')}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side - Logo */}
                <div className="w-1/2 bg-gray-50 flex items-center justify-center p-10">
                    <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 mr-4"></div>
                        <span className="text-5xl font-bold text-purple-700">servana</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

"hello world"
