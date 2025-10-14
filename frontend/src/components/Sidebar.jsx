import {
  Home,
  ThumbsUp,
  Clock,
  Video,
  Folder,
  Users,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

const menuItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Liked Videos", icon: ThumbsUp, href: "/liked" },
  { title: "History", icon: Clock, href: "/history" },
  { title: "My Content", icon: Video, href: "/content" },
  { title: "Collections", icon: Folder, href: "/collections" },
  { title: "Subscribers", icon: Users, href: "/subscribers" },
];

const bottomMenu = [
  { title: "Support", icon: HelpCircle, href: "/support" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside
        className={`hidden md:flex flex-col bg-zinc-950 border-r border-zinc-800 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-3 border-b border-zinc-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white hover:bg-zinc-800"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-800 hover:text-white transition-all group ${
                    collapsed ? "justify-center" : ""
                  }`}
                  title={collapsed ? item.title : ""}
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Bottom Menu */}
        <div className="border-t border-zinc-800 py-4">
          <div className="space-y-1 px-3">
            {bottomMenu.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-800 hover:text-white transition-all ${
                    collapsed ? "justify-center" : ""
                  }`}
                  title={collapsed ? item.title : ""}
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 z-40">
        <div className="flex justify-around items-center h-16 px-2">
          {[
            { icon: Home, label: "Home", href: "/" },
            { icon: Video, label: "Content", href: "/content" },
            { icon: Users, label: "Subscribers", href: "/subscribers" },
            { icon: Settings, label: "Settings", href: "/settings" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 py-2 px-4 text-gray-400 hover:text-white transition-colors min-w-0"
              >
                <Icon size={22} className="shrink-0" />
                <span className="text-xs font-medium truncate">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
