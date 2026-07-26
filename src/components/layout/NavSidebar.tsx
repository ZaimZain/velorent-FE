import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, LayoutDashboard, Car, ClipboardList, Users, CalendarDays, Bell, LogOut, Store } from "lucide-react";

import logoUrl from "../../assets/VelorentLogo-nobg.png"; // <-- put the png here
import { logoutUser } from "../../utils/Auth";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

interface NavSidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function NavSidebar({ collapsed, setCollapsed }: NavSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const items: NavItem[] = useMemo(
    () => [
      { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
      { label: "Car Fleet", path: "/car", icon: <Car size={18} /> },
      { label: "Rental Status", path: "/rental", icon: <ClipboardList size={18} /> },
      { label: "Customers", path: "/customer", icon: <Users size={18} /> },
      { label: "Calendar", path: "/calendar", icon: <CalendarDays size={18} /> },
      { label: "Notifications", path: "/notification", icon: <Bell size={18} /> },
    ],
    []
  );

  return (
    <div className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="
            w-10 h-10
            flex items-center justify-center
            rounded-lg
            hover:bg-sidebar-accent
            transition
          "
        >
          <Menu size={20}/>
        </button>
      </div>

      {/* Logo block */}
      <div
          className="h-24 flex items-center justify-center">
          {!collapsed && (
            <img
              src={logoUrl}
              alt="Velorent"
              className="h-16 w-auto select-none"
              draggable={false}
            />
          )}
        </div>
      {/* Divider */}
      <div className="mx-4 my-5 border-t border-sidebar-border" />
      {/* Nav */}
      <nav className="px-4 flex-1">
        <ul className="space-y-1">
          {items.map((item) => {
            const active = location.pathname === item.path;

            return (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  ].join(" ")}
                >
                  <span className={active ? "opacity-95" : "opacity-80"}>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="mt-6 border-t border-sidebar-border" />
      </nav>

      {/* Bottom actions */}
      <div className="px-4 pb-5">
        <button
          type="button"
          onClick={() => navigate("/marketplace")} // change route if needed
          className="
            w-full mt-4 flex items-center justify-between
            px-4 py-2.5 rounded-lg text-sm font-semibold
            border border-border bg-card text-foreground
            hover:bg-muted transition
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring
          "
        >
          <span className="flex items-center gap-2">
            <Store size={18} className="opacity-80" />
            View Marketplace
          </span>

          <span
            className="
              text-[11px] font-semibold
              px-2 py-0.5 rounded-full
              bg-primary text-primary-foreground
            "
          >
            Public
          </span>
        </button>

        <div className="mt-4 border-t border-sidebar-border" />

        <button
          type="button"
          onClick={() => logoutUser(navigate)}
          className="
            w-full mt-3 flex items-center gap-2
            px-4 py-2.5 rounded-lg text-sm font-semibold
            text-destructive hover:bg-muted transition
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
