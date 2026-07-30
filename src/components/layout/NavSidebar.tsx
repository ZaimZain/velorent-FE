import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Car, ClipboardList, Users, CalendarDays, Bell, Store } from "lucide-react";

import logoLight from "../../assets/VelorentLogo-nobg-blue.png";
import logoDark from "../../assets/VelorentLogo-nobg-gold.png";
import { logoutUser } from "../../utils/Auth";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

interface NavSidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  onNavigate?: () => void;
}

export default function NavSidebar({ collapsed, setCollapsed, onNavigate }: NavSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(
        document.documentElement.classList.contains("dark")
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
    <div className="h-full flex flex-col overflow-hidden transition-all duration-300">
      {/* Logo block */}
      <div
        className={`
          flex items-center justify-center transition-all duration-300
          ${collapsed ? "h-20" : "h-48"}
        `}>
        <img
          src={isDarkMode ? logoDark : logoLight}
          alt="Velorent"
          className={`
            select-none
            object-scale-down
            ${collapsed ? "w-10 h-10" : "w-44 h-44"}
          `}
          draggable={false}
        />
      </div>
      {/* Divider */}
      <div className="mx-4 mb-5 border-t border-sidebar-border" />
      {/* Nav */}
      <nav className={`px-4 flex-1 ${collapsed ? "mt-2" : ""}`}>
        <ul className="space-y-1">
          {items.map((item) => {
            const active = location.pathname === item.path;

            return (
              <li key={item.path}>
                <button
                  type="button"
                  title={collapsed ? item.label : undefined}
                  onClick={() => navigate(item.path)}
                  className={[
                    "w-full flex items-center rounded-lg text-sm font-semibold transition-all duration-300",
                    collapsed
                      ? "justify-center px-2 py-2.5"
                      : "gap-3 px-4 py-2.5",
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
      <div className={`px-4 pb-5 ${collapsed ? "px-2" : ""}`}>
        <button
          type="button"
          title={collapsed ? "View Marketplace" : undefined}
          onClick={() => navigate("/marketplace")}
          className="
            w-full mt-4 flex items-center justify-between
            px-4 py-2.5 rounded-lg text-sm font-semibold
            border border-border bg-card text-foreground
            hover:bg-muted transition
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring
          ">
          <span
            className={
              collapsed
                ? "flex items-center justify-center w-full"
                : "flex items-center gap-2"
            }>
            <Store size={18} className="opacity-80" />
            {!collapsed && "View Marketplace"}
          </span>

          {!collapsed && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
              Public
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
