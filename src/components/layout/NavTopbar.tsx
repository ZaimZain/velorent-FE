import { ExternalLink, Moon, Store, LayoutDashboard } from "lucide-react";

interface NavTopbarProps {
  title: string;
}

export default function NavTopbar({ title }: NavTopbarProps) {
  return (
    <div className="h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-foreground/80">
          <LayoutDashboard size={18} />
        </div>
        <div className="font-semibold">{title}</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="
            inline-flex items-center gap-2
            rounded-lg px-3 py-2 text-sm font-semibold
            border border-border bg-card text-foreground
            hover:bg-muted transition
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring
          "
        >
          <Store size={16} className="opacity-80" />
          View Marketplace
          <ExternalLink size={16} className="opacity-70" />
        </button>

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
            // optional theme toggle using your .dark class
            document.documentElement.classList.toggle("dark");
          }}
        >
          <Moon size={18} className="opacity-80" />
        </button>
      </div>
    </div>
  );
}
