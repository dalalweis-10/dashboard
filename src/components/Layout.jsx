import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
function Layout({ children, onLogout, adminName }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="flex min-h-screen bg-surface-light dark:bg-surface-dark">
      <Sidebar
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    mobileOpen={mobileOpen}
    setMobileOpen={setMobileOpen}
  />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} onLogout={onLogout} adminName={adminName} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-auto">{children}</main>
      </div>
    </div>;
}
export {
  Layout
};
