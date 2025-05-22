import { useState } from "react";
import { Search, LogIn } from "lucide-react"; // Import LogIn icon

export default function Navbar() {
  const user = false;
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="flex items-center justify-between h-20 px-4  md:px-6 sm:p-2  max-sm:h-14  py-3 bg-zinc-900 border border-white relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold text-purple-400">PLAY</span>
      </div>

      {/* Search - Desktop */}
      <div className="flex-1 mx-4 max-w-lg hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 rounded bg-zinc-900 border border-white text-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Auth/Profile & Search Icon (Mobile) */}
      <div className="flex items-center space-x-4">
        {/* Search Icon - Mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-zinc-800"
          onClick={() => setShowMobileSearch((v) => !v)}
          aria-label="Open search"
        >
          <Search className="text-gray-400" size={24} />
        </button>

        {!user ? (
          <>
            {/* Log in button for desktop only */}
            <button className="text-white px-4 py-2 rounded hover:bg-gray-800 hidden md:block">
              Log in
            </button>
             {/* Sign up button - Desktop only with purple design */}
      <div className="hidden md:inline-block relative">
        <div className="absolute inset-0 bg-purple-300 rounded translate-x-1 translate-y-1 z-0"></div>
        <button
          className="relative z-10 font-bold text-purple-900 bg-purple-600 px-4 py-2 rounded shadow-md transition-all duration-100 active:translate-x-[-4px] active:translate-y-[-4px] hover:bg-purple-700
          sm:px-4 sm:py-2 sm:text-base text-sm"
        >
          Sign up
        </button>
      </div>
         {/* Log in & Sign up - Mobile only, plain styling */}
      <div className="flex gap-2 md:hidden">
        <button className="flex items-center gap-1 px-2 py-1 rounded text-white text-sm font-normal hover:bg-gray-800 ">
          Log in
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded text-white text-sm font-normal hover:bg-gray-800">
          Sign up
        </button>
      </div>
          </>
        ) : (
          <img
            src={user.avatar}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        )}
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-50 md:hidden">
          <div className="w-full px-4 pt-8">
            <div className="relative max-w-lg mx-auto">
              <input
                autoFocus
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 pr-4 rounded bg-zinc-900 border border-white text-white text-lg"
              />
              <Search className="absolute left-4 top-3 text-gray-400" size={22} />
              <button
                className="absolute right-2 top-2 text-white text-xl"
                onClick={() => setShowMobileSearch(false)}
                aria-label="Close search"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}