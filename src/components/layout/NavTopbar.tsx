import { useState } from "react";
import { Moon, Menu, User, ChevronDown, LogOut } from "lucide-react";
import { logoutUser } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";

interface NavTopbarProps {
  title: string;
  icon?: React.ReactNode;
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export default function NavTopbar({ title,icon,onMenuClick,showMenu = false }: NavTopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="h-16 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {showMenu && (
          <button type="button" onClick={onMenuClick} className="inline-flex items-center justify-center md:inline-flex xl:hidden rounded-lg w-10 h-10 hover:bg-muted transition">
            <Menu size={20} />
          </button>
        )}
        {icon ? (
          <div className="text-foreground/80">{icon}</div>
        ) : null}
        <div className="font-semibold text-xl truncate">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="
              inline-flex items-center gap-2
              rounded-lg px-3 py-2 text-sm font-semibold
              border border-border bg-card text-foreground
              hover:bg-muted transition
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring
            ">
            <User size={16} />
            <span className="hidden md:inline">
              User
            </span>
            <ChevronDown size={16} />
          </button>

          {profileOpen && (
            <div
              className="
                absolute right-0 mt-2
                w-40
                rounded-lg
                border border-border
                bg-card
                shadow-lg
                p-1
                z-50
              ">
              <button
                type="button"
                className="
                  w-full text-left
                  px-3 py-2
                  rounded-md
                  text-sm
                  hover:bg-muted
                ">
                Profile
              </button>
              <button
                type="button"
                className="
                  w-full text-left
                  px-3 py-2
                  rounded-md
                  text-sm
                  hover:bg-muted
                ">
                Settings
              </button>
              <div className="my-1 border-t border-border" />
              <button
                type="button"
                onClick={() => logoutUser(navigate)}
                className="
                  w-full text-left
                  px-3 py-2
                  rounded-md
                  text-sm
                  text-destructive
                  hover:bg-muted
                ">
                Logout
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Toggle theme"
          className="
            inline-flex items-center justify-center
            rounded-lg w-10 h-10
            border border-border bg-card text-foreground
            hover:bg-muted transition
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring
          "
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}>
          <Moon size={18} className="opacity-80" />
        </button>
      </div>
    </div>
  );
}
