import NavSidebar from "./NavSidebar";
import NavTopbar from "./NavTopbar";

interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title = "Welcome to Velorent CMS", children }: PageLayoutProps) {
  return (
    <div
      className="
        min-h-screen grid
        [grid-template-columns:260px_1fr]
        [grid-template-rows:64px_1fr]
        [grid-template-areas:'sidebar_topbar''sidebar_main']
        bg-background text-foreground
      "
    >
      <aside
        className="
          [grid-area:sidebar]
          bg-sidebar text-sidebar-foreground
          border-r border-sidebar-border
          h-screen sticky top-0
        "
      >
        <NavSidebar />
      </aside>

      <header
        className="
          [grid-area:topbar]
          bg-card text-card-foreground
          border-b border-border
          h-16 sticky top-0 z-10
        "
      >
        <NavTopbar title={title} />
      </header>

      <main className="[grid-area:main] overflow-auto">
        {/* main content spacing similar to screenshot */}
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
