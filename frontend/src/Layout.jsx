import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-black text-white" style={{ height: "calc(100vh - 5rem)" }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
