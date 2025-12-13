import { useState } from "react";
import App from "./App";
import MarketplaceApp from "./MarketplaceApp";

export default function AppRouter() {
  const [currentApp, setCurrentApp] = useState<"management" | "marketplace">("management");

  if (currentApp === "marketplace") {
    return <MarketplaceApp onSwitchToManagement={() => setCurrentApp("management")} />;
  }

  return <App onSwitchToMarketplace={() => setCurrentApp("marketplace")} />;
}
