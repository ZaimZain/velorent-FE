import { useEffect, useState } from "react";
import NavSidebar from "./NavSidebar";
import NavTopbar from "./NavTopbar";

interface PageLayoutProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageLayout({ title = "Welcome to Velorent CMS", icon, children }: PageLayoutProps) {
  const [isTabletSidebarCollapsed, setIsTabletSidebarCollapsed] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setIsDesktop(width >= 1280);

      if (width >= 1280) {
        setIsMobileSidebarOpen(false);
        setIsTabletSidebarCollapsed(false);
      }

      if (width >= 768 && width < 1280) {
        setIsMobileSidebarOpen(false);
        setIsTabletSidebarCollapsed(true);
      }

      if (width < 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      style={{
        "--sidebar-width":
          window.innerWidth >= 768
            ? (isTabletSidebarCollapsed ? "72px" : "260px")
            : "0px",
      } as React.CSSProperties}
      className="
          min-h-screen grid transition-[grid-template-columns] duration-300 ease-in-out
          grid-cols-1
          grid-rows-[64px_1fr]
          [grid-template-areas:'topbar''main']
          md:grid-cols-[var(--sidebar-width)_1fr]
          xl:grid-cols-[260px_1fr]
          md:grid-rows-[64px_1fr]
          md:[grid-template-areas:'sidebar_topbar''sidebar_main']
          bg-background text-foreground
      ">
      <aside
        className={`
          [grid-area:sidebar]
          h-screen
          bg-sidebar
          text-sidebar-foreground
          border-r border-sidebar-border
          fixed
          md:static
          top-0
          left-0
          z-40
          w-[var(--sidebar-width)]
          overflow-hidden
          md:w-auto
          transition-[width,transform]
          duration-300
          ease-out
          md:translate-x-0
          ${
            isMobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}>
        <NavSidebar
          key={
            window.innerWidth >= 1280
              ? "desktop"
              : window.innerWidth >= 768
              ? "tablet"
              : "mobile"
          }
          collapsed={
            isDesktop || window.innerWidth < 768
              ? false
              : isTabletSidebarCollapsed
          }
          setCollapsed={setIsTabletSidebarCollapsed}
          onNavigate={() => setIsMobileSidebarOpen(false)}
        />
      </aside>
      {isMobileSidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-30
            md:hidden
          "
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      <header
        className="
          [grid-area:topbar]
          bg-card text-card-foreground
          border-b border-border
          h-16 sticky top-0 z-10
        ">
        <NavTopbar title={title} icon={icon} showMenu={true} 
          onMenuClick={() => {
            if (window.innerWidth < 768) {
              setIsMobileSidebarOpen(true);
            } else {
              setIsTabletSidebarCollapsed(
                !isTabletSidebarCollapsed
              );
            }
          }}
        />
      </header>

      <main className="[grid-area:main] overflow-auto">
        {/* main content spacing similar to screenshot */}
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
