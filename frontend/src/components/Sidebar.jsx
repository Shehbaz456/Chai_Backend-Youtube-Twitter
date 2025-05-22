import {
  Home,
  ThumbsUp,
  Clock,
  Video,
  Folder,
  Users,
  HelpCircle,
  Settings,
  PanelLeft,
  PanelRight,
} from "lucide-react";

const menuItems = [
  { title: "Home", icon: Home },
  { title: "Liked Videos", icon: ThumbsUp },
  { title: "History", icon: Clock },
  { title: "My Content", icon: Video },
  { title: "Collections", icon: Folder },
  { title: "Subscribers", icon: Users },
];

const bottomMenu = [
  { title: "Support", icon: HelpCircle },
  { title: "Settings", icon: Settings },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-zinc-900 border-r border-white transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
        style={{ height: "calc(100vh - 5rem)" }} // assuming navbar height = 5rem
      >
        {/* Collapse Toggle Button */}
        <div className="flex align-middle items-center justify-end px-4 py-4">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <PanelRight size={20} /> : <PanelLeft size={20} />}
          </button>
        </div>

        {/* Top Menu */}
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href="#"
              className={`flex items-center py-3 text-gray-200 hover:bg-gray-800 rounded transition-colors
        ${
          collapsed
            ? "border border-white m-2 justify-center"
            : " border border-white px-4 m-2"
        }
      `}
            >
              <item.icon className={`${collapsed ? "" : "mr-3"}`} size={20} />
              {!collapsed && <span>{item.title}</span>}
            </a>
          ))}
        </nav>

        {/* Bottom Menu (Support / Settings) */}
        <nav className="py-2">
          {bottomMenu.map((item) => (
            <a
              key={item.title}
              href="#"
              className={`flex items-center py-3 text-gray-200 hover:bg-gray-800 rounded transition-colors
        ${collapsed ? "border border-white m-2 justify-center" : "border border-white px-4 m-2"}
      `}
            >
              <item.icon className={`${collapsed ? "" : "mr-3"}`} size={20} />
              {!collapsed && <span>{item.title}</span>}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-zinc-900 border-t border-white py-2 md:hidden">
        {[
          { icon: Home },
          { icon: Video },
          {  icon: Users },
          { icon: Settings },
        ].map((item) => (
          <a
            key={item.title}
            href="#"
            className="flex flex-col items-center text-white text-xs"
          >
            <item.icon size={22} />
            {/* <span className="text-xs mt-1">{item.title}</span> */}
          </a>
        ))}
      </nav>
    </>
  );
}
