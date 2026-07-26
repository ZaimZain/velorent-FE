import { useState } from "react";
import NavSidebar from "./NavSidebar";
import NavTopbar from "./NavTopbar";

interface PageLayoutProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageLayout({ title = "Welcome to Velorent CMS", icon, children }: PageLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div
      style={{
        "--sidebar-width": isSidebarCollapsed ? "72px" : "260px",
      } as React.CSSProperties}
      className="
          min-h-screen grid
          grid-cols-1
          grid-rows-[64px_1fr]
          [grid-template-areas:'topbar''main']
          xl:grid-cols-[var(--sidebar-width)_1fr]
          xl:grid-rows-[64px_1fr]
          xl:[grid-template-areas:'sidebar_topbar''sidebar_main']
          bg-background text-foreground
      ">
      <aside
        className="
            [grid-area:sidebar]
            h-screen
            bg-sidebar
            text-sidebar-foreground
            border-r border-sidebar-border
            transition-all duration-300 ease-in-out">
        <NavSidebar
            collapsed={isSidebarCollapsed}
            setCollapsed={setIsSidebarCollapsed}/>
      </aside>

      <header
        className="
          [grid-area:topbar]
          bg-card text-card-foreground
          border-b border-border
          h-16 sticky top-0 z-10
        ">
        <NavTopbar
          title={title}
          icon={icon}
        />
      </header>

      <main className="[grid-area:main] overflow-auto">
        {/* main content spacing similar to screenshot */}
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
