// import { useState } from "react";
// import { Search, LogIn } from "lucide-react"; // Import LogIn icon

// export default function Navbar() {
//   const user = false;
//   const [showMobileSearch, setShowMobileSearch] = useState(false);

//   return (
//     <nav className="flex items-center justify-between h-20 px-4  md:px-6 sm:p-2  max-sm:h-14  py-3 bg-zinc-900 border border-white relative">
//       {/* Logo */}
//       <div className="flex items-center">
//         <img src="/images/logo.png" alt="Logo" className="h-14 w-14" />
//         <span className="text-2xl font-bold text-purple-400">PLAY</span>
//       </div>

//       {/* Search - Desktop */}
//       <div className="flex-1 mx-4 max-w-lg hidden md:block">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full py-2 pl-10 pr-4 rounded bg-zinc-900 border border-white text-white"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>
//       </div>

//       {/* Auth/Profile & Search Icon (Mobile) */}
//       <div className="flex items-center space-x-4">
//         {/* Search Icon - Mobile */}
//         <button
//           className="md:hidden p-2 rounded hover:bg-zinc-800"
//           onClick={() => setShowMobileSearch((v) => !v)}
//           aria-label="Open search"
//         >
//           <Search className="text-gray-400" size={24} />
//         </button>

//         {!user ? (
//           <>
//             {/* Log in button for desktop only */}
//             <button className="text-white px-4 py-2 rounded hover:bg-gray-800 hidden md:block">
//               Log in
//             </button>
//              {/* Sign up button - Desktop only with purple design */}
//       <div className="hidden md:inline-block relative">
//         <div className="absolute inset-0 bg-purple-300 rounded translate-x-1 translate-y-1 z-0"></div>
//         <button
//           className="relative z-10 font-bold bg-purple-600 px-4 py-2 rounded shadow-md transition-all duration-100 active:translate-x-[-4px] active:translate-y-[-4px] hover:bg-purple-700
//           sm:px-4 sm:py-2 sm:text-base text-sm"
//         >
//           Sign up
//         </button>
//       </div>
//          {/* Log in & Sign up - Mobile only, plain styling */}
//       <div className="flex gap-2 md:hidden">
//         <button className="flex items-center gap-1 px-2 py-1 rounded text-white text-sm font-normal hover:bg-gray-800 ">
//           Log in
//         </button>
//         <button className="flex items-center gap-1 px-2 py-1 rounded text-white text-sm font-normal hover:bg-gray-800">
//           Sign up
//         </button>
//       </div>
//           </>
//         ) : (
//           <img
//             src={user.avatar}
//             alt="Profile"
//             className="h-8 w-8 rounded-full"
//           />
//         )}
//       </div>

//       {/* Mobile Search Overlay */}
//       {showMobileSearch && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-50 md:hidden">
//           <div className="w-full px-4 pt-8">
//             <div className="relative max-w-lg mx-auto">
//               <input
//                 autoFocus
//                 type="text"
//                 placeholder="Search"
//                 className="w-full py-3 pl-12 pr-4 rounded bg-zinc-900 border border-white text-white text-lg"
//               />
//               <Search className="absolute left-4 top-3 text-gray-400" size={22} />
//               <button
//                 className="absolute right-2 top-2 text-white text-xl"
//                 onClick={() => setShowMobileSearch(false)}
//                 aria-label="Close search"
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }








// // button

// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva } from "class-variance-authority";

// import { cn } from "@/lib/utils"

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
//         outline:
//           "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
//         ghost:
//           "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2 has-[>svg]:px-3",
//         sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
//         lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
//         icon: "size-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// function Button({
//   className,
//   variant,
//   size,
//   asChild = false,
//   ...props
// }) {
//   const Comp = asChild ? Slot : "button"

//   return (
//     (<Comp
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props} />)
//   );
// }

// export { Button, buttonVariants }


// //sidebar

// import {
//   Home,
//   ThumbsUp,
//   Clock,
//   Video,
//   Folder,
//   Users,
//   HelpCircle,
//   Settings,
//   PanelLeft,
//   PanelRight,
// } from "lucide-react";

// const menuItems = [
//   { title: "Home", icon: Home },
//   { title: "Liked Videos", icon: ThumbsUp },
//   { title: "History", icon: Clock },
//   { title: "My Content", icon: Video },
//   { title: "Collections", icon: Folder },
//   { title: "Subscribers", icon: Users },
// ];

// const bottomMenu = [
//   { title: "Support", icon: HelpCircle },
//   { title: "Settings", icon: Settings },
// ];

// export default function Sidebar({ collapsed, setCollapsed }) {
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <aside
//         className={`hidden md:flex flex-col bg-zinc-900 border-r border-white transition-all duration-300 ${
//           collapsed ? "w-16" : "w-60"
//         }`}
//         style={{ height: "calc(100vh - 5rem)" }} // assuming navbar height = 5rem
//       >
//         {/* Collapse Toggle Button */}
//         <div className="flex align-middle items-center justify-end px-4 py-4">
//           <button
//             className="text-gray-400 hover:text-white"
//             onClick={() => setCollapsed(!collapsed)}
//           >
//             {collapsed ? <PanelRight size={20} /> : <PanelLeft size={20} />}
//           </button>
//         </div>

//         {/* Top Menu */}
//         <nav className="flex-1 overflow-y-auto">
//           {menuItems.map((item) => (
//             <a
//               key={item.title}
//               href="#"
//               className={`flex items-center py-3 text-gray-200 hover:bg-gray-800 rounded transition-colors
//         ${
//           collapsed
//             ? "border border-white m-2 justify-center"
//             : " border border-white px-4 m-2"
//         }
//       `}
//             >
//               <item.icon className={`${collapsed ? "" : "mr-3"}`} size={20} />
//               {!collapsed && <span>{item.title}</span>}
//             </a>
//           ))}
//         </nav>

//         {/* Bottom Menu (Support / Settings) */}
//         <nav className="py-2">
//           {bottomMenu.map((item) => (
//             <a
//               key={item.title}
//               href="#"
//               className={`flex items-center py-3 text-gray-200 hover:bg-gray-800 rounded transition-colors
//         ${collapsed ? "border border-white m-2 justify-center" : "border border-white px-4 m-2"}
//       `}
//             >
//               <item.icon className={`${collapsed ? "" : "mr-3"}`} size={20} />
//               {!collapsed && <span>{item.title}</span>}
//             </a>
//           ))}
//         </nav>
//       </aside>

//       {/* Mobile Bottom Nav */}
//       <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-zinc-900 border-t border-white py-2 md:hidden">
//         {[
//           { icon: Home },
//           { icon: Video },
//           {  icon: Users },
//           { icon: Settings },
//         ].map((item) => (
//           <a
//             key={item.title}
//             href="#"
//             className="flex flex-col items-center text-white text-xs"
//           >
//             <item.icon size={22} />
//             {/* <span className="text-xs mt-1">{item.title}</span> */}
//           </a>
//         ))}
//       </nav>
//     </>
//   );
// }



// ESlint

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ]




import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet.jsx";

export default function Navbar() {
  const user = false;
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
      <div className="flex items-center justify-between h-20 px-4 md:px-6">
        {/* Mobile Menu (Hamburger) - Only visible on mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-zinc-800"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-72 bg-zinc-950 border-zinc-800 p-0"
            >
              <MobileSidebar />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-purple-500">PLAY</span>
          </div>
        </div>

        {/* Desktop Logo - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-purple-500">PLAY</span>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-4 pr-4 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={22}
            />
          </div>
        </div>

        {/* Auth Buttons & Search Icon (Mobile) */}
        <div className="flex items-center gap-2">
          {/* Search Icon - Mobile only */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-zinc-800"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Toggle search"
          >
            <Search size={22} />
          </Button>

          {!user ? (
            <>
              {/* Desktop Auth Buttons */}
              <Button
                variant="ghost"
                className="hidden md:inline-flex text-white hover:bg-zinc-800"
              >
                Log in
              </Button>
              <Button className="hidden md:inline-flex bg-purple-600 hover:bg-purple-700 text-white">
                Sign up
              </Button>

              {/* Mobile Auth Buttons */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-zinc-800 text-xs px-3"
              >
                Log in
              </Button>
              <Button
                size="sm"
                className="md:hidden bg-purple-600 hover:bg-purple-700 text-white text-xs px-3"
              >
                Sign up
              </Button>
            </>
          ) : (
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              U
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-4 border-t border-zinc-800 bg-zinc-950">
          <div className="relative pt-4">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              className="w-full py-3 pl-4 pr-10 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
            <button
              onClick={() => setShowMobileSearch(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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

// Mobile Sidebar Component
function MobileSidebar() {
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
    <div className="flex flex-col h-full py-6">
      {/* Logo in Drawer */}
      <div className="px-6 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-purple-500">PLAY</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <SheetClose key={item.title} asChild>
              <a
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
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
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
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
