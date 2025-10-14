import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";

export default function Navbar() {
  const user = false;
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
      <div className="flex items-center justify-between h-20 px-4 md:px-6">
        {/* Logo - Always visible with animation */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center animate-pulse-slow hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-purple-500 group-hover:text-purple-400 transition-colors duration-300">
            FLY PLAY
          </span>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-4 pr-12 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300 pointer-events-none"
              size={22}
            />
          </div>
        </div>

        {/* Right Side - Search Icon & Hamburger (Mobile) + Auth Buttons (Desktop) */}
        <div className="flex items-center gap-2">
          {/* Search Icon - Mobile only */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-zinc-800 hover:text-purple-400 transition-all duration-300"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Toggle search"
          >
            <Search size={22} />
          </Button>

          {/* Hamburger Menu - Mobile only */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-zinc-800 hover:text-purple-400 transition-all duration-300"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-zinc-950 border-zinc-800 p-0"
              >
                <MobileSidebar user={user} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Auth Buttons */}
          {!user ? (
            <>
              <Button
                variant="ghost"
                className="hidden md:inline-flex text-white hover:bg-zinc-800 hover:text-white hover:scale-105 transition-all duration-300"
              >
                Log in
              </Button>
              <Button className="hidden md:inline-flex bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Sign up
              </Button>
            </>
          ) : (
            <div className="hidden md:flex w-9 h-9 rounded-full bg-purple-600 items-center justify-center text-white font-semibold hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer">
              U
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-4 border-t border-zinc-800 bg-zinc-950 animate-slide-down">
          <div className="relative pt-4">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              className="w-full py-3 pl-4 pr-10 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            <button
              onClick={() => setShowMobileSearch(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Mobile Sidebar Component with Login/Signup
function MobileSidebar({ user }) {
  const menuItems = [
    { title: "Home", icon: "🏠", href: "/" },
    { title: "Liked Videos", icon: "👍", href: "/liked" },
    { title: "History", icon: "🕐", href: "/history" },
    { title: "My Content", icon: "📹", href: "/content" },
    { title: "Collections", icon: "📁", href: "/collections" },
    { title: "Subscribers", icon: "👥", href: "/subscribers" },
  ];

  const bottomMenu = [
    { title: "Support", icon: "❓", href: "/support" },
    { title: "Settings", icon: "⚙️", href: "/settings" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header with Logo */}
      <div className="px-6 py-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-purple-500">FLY PLAY</span>
        </div>
      </div>

      {/* Auth Buttons - Only show if user is not logged in */}
      {!user && (
        <div className="px-6 py-4 border-b border-zinc-800 space-y-3">
          <SheetClose asChild>
            <Button
              variant="secondary"
              className="w-full justify-center bg-zinc-800 text-white hover:bg-zinc-700 hover:scale-[1.02] border-0 transition-all duration-300"
            >
              Log in
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button className="w-full justify-center bg-purple-600 hover:bg-purple-700 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              Sign up
            </Button>
          </SheetClose>
        </div>
      )}

      {/* User Profile - Only show if user is logged in */}
      {user && (
        <div className="px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-purple-500/30">
              U
            </div>
            <div>
              <p className="text-white font-medium">Username</p>
              <p className="text-gray-400 text-sm">user@example.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <SheetClose key={item.title} asChild>
              <a
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-800 hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </a>
            </SheetClose>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-zinc-800"></div>

        {/* Bottom Menu */}
        <div className="space-y-1 px-3">
          {bottomMenu.map((item) => (
            <SheetClose key={item.title} asChild>
              <a
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-800 hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </a>
            </SheetClose>
          ))}
        </div>
      </div>
    </div>
  );
}
