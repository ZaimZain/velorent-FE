import { useState } from "react";
import ManagementApp from "./ManagementApp";
import MarketplaceApp from "./MarketplaceApp";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Store, LayoutDashboard } from "lucide-react";

export default function App() {
  const [currentApp, setCurrentApp] = useState<"management" | "marketplace">("management");

  // Simple app switcher overlay for demo purposes
  const showSwitcher = true; // Set to false in production

  if (currentApp === "marketplace") {
    return (
      <>
        <MarketplaceApp onSwitchToManagement={() => setCurrentApp("management")} />
        {showSwitcher && (
          <div className="fixed bottom-4 left-4 z-50 hidden lg:block">
            <Badge className="bg-green-600 text-white px-3 py-1.5 text-xs">
              Marketplace Mode (Public View)
            </Badge>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <ManagementApp onSwitchToMarketplace={() => setCurrentApp("marketplace")} />
      {showSwitcher && (
        <div className="fixed bottom-4 left-4 z-50 hidden lg:block">
          <Badge className="bg-blue-600 text-white px-3 py-1.5 text-xs">
            Management Mode (Owner View)
          </Badge>
        </div>
      )}
    </>
  );
}
