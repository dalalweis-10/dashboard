import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Route,
  Users,
  Truck,
  Ticket,
  UserCircle,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  X,
  Bus,
  Building2
} from "lucide-react";
const navItems = [
  { to: "/", label: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645", icon: LayoutDashboard, end: true },
  { to: "/trips", label: "\u0627\u0644\u0631\u062D\u0644\u0627\u062A", icon: Route },
  { to: "/drivers", label: "\u0627\u0644\u0633\u0627\u0626\u0642\u0648\u0646", icon: Users },
  { to: "/vehicles", label: "\u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062A", icon: Truck },
  { to: "/bookings", label: "\u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A", icon: Ticket },
  { to: "/companies", label: "\u0627\u0644\u0634\u0631\u0643\u0627\u062A", icon: Building2 },
  { to: "/customers", label: "\u0627\u0644\u0639\u0645\u0644\u0627\u0621", icon: UserCircle },
  { to: "/reports", label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", icon: BarChart3 },
  { to: "/settings", label: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A", icon: Settings }
];
function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  return <>
      {
    /* Mobile overlay */
  }
      {mobileOpen && <div
    className="fixed inset-0 bg-black/30 z-30 lg:hidden"
    onClick={() => setMobileOpen(false)}
  />}

      <aside
    className={`
          fixed lg:sticky top-0 right-0 z-40 h-screen
          bg-white dark:bg-navy-600 border-l border-gray-100 dark:border-navy-400/30
          flex flex-col transition-all duration-300
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          ${mobileOpen ? "w-64 translate-x-0" : "w-64 translate-x-full lg:translate-x-0"}
        `}
  >
        {
    /* Logo */
  }
        <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-100 dark:border-navy-400/30 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-teal-400 flex items-center justify-center shrink-0">
            <Bus className="w-5 h-5 text-white" />
          </div>
          {!collapsed && <span className="text-lg font-bold text-navy-500 dark:text-white">سايرنا</span>}
          <button
    className="lg:hidden mr-auto p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20"
    onClick={() => setMobileOpen(false)}
  >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {
    /* Navigation */
  }
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
    const Icon = item.icon;
    return <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      onClick={() => setMobileOpen(false)}
      className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
      title={collapsed ? item.label : void 0}
    >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>;
  })}
        </nav>

        {
    /* Collapse toggle - desktop only */
  }
        <div className="hidden lg:flex items-center justify-center py-3 border-t border-gray-100 dark:border-navy-400/30 shrink-0">
          <button
    onClick={() => setCollapsed(!collapsed)}
    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-400/20 hover:text-navy-500 dark:hover:text-white"
  >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>
    </>;
}
export {
  Sidebar
};
