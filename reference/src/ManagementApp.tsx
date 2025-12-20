import { useState } from "react";
// import { Sidebar } from "./components/ui/sidebar";
import { VelorentLogo } from "./components/VelorentLogo";
import { ThemeToggle } from "./components/ThemeToggle";
import { Dashboard } from "./components/Dashboard";
import { CarList } from "./components/CarList";
// import { AddCarForm } from "./components/AddCarForm";
import { RentalStatus } from "./components/RentalStatus";
import { CustomerManagement } from "./components/CustomerManagement";
import { CalendarView } from "./components/CalendarView";
import { Notifications } from "./components/Notifications";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Users, 
  Bell,
  Menu,
  X,
  ClipboardList,
  Store,
  ExternalLink,
  LogOut
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";

export default function ManagementApp({ onSwitchToMarketplace }: { onSwitchToMarketplace?: () => void }) {
  const [activeView, setActiveView] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      id: "cars",
      label: "Car Fleet",
      icon: Car
    },
    {
      id: "rentals",
      label: "Rental Status",
      icon: ClipboardList
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell
    }
  ];

  const handleLogout = () => {
    // In a real application, this would clear authentication tokens
    // and redirect to login page or handle logout via API
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear any stored auth data
      localStorage.removeItem("authToken");
      // You can add more cleanup here
      alert("Logged out successfully. In production, this would redirect to login page.");
      // window.location.href = '/login'; // Uncomment when implementing actual auth
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "cars":
        return <CarList />;
      case "rentals":
        return <RentalStatus />;
      case "customers":
        return <CustomerManagement />;
      case "calendar":
        return <CalendarView />;
      case "notifications":
        return <Notifications />;
      default:
        return <Dashboard />;
    }
  };

  const activeItem = navigationItems.find(item => item.id === activeView);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
        <VelorentLogo />
        <div className="flex items-center gap-2">
          {onSwitchToMarketplace && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToMarketplace}
              className="gap-2"
            >
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Marketplace</span>
            </Button>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <VelorentLogo />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
              
              {onSwitchToMarketplace && (
                <>
                  <div className="my-4 border-t" />
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 border-primary/20 bg-primary/5 hover:bg-primary/10"
                    onClick={() => {
                      onSwitchToMarketplace();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Store className="h-4 w-4" />
                    <span>View Marketplace</span>
                    <Badge className="ml-auto bg-primary text-xs">Public</Badge>
                  </Button>
                </>
              )}
              
              <div className="my-4 border-t" />
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen border-r bg-card">
          <div className="p-6">
            <div className="mb-8 px-2">
              <VelorentLogo />
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveView(item.id)}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
              
              {onSwitchToMarketplace && (
                <>
                  <div className="my-4 border-t" />
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 border-primary/20 bg-primary/5 hover:bg-primary/10"
                    onClick={onSwitchToMarketplace}
                  >
                    <Store className="h-4 w-4" />
                    <span>View Marketplace</span>
                    <Badge className="ml-auto bg-primary text-xs">Public</Badge>
                  </Button>
                </>
              )}
              
              <div className="my-4 border-t" />
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between p-6 border-b bg-card">
            <div className="flex items-center gap-3">
              {activeItem && (
                <>
                  <activeItem.icon className="h-6 w-6 text-muted-foreground" />
                  <h1 className="text-xl font-semibold">{activeItem.label}</h1>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              {onSwitchToMarketplace && (
                <Button
                  variant="outline"
                  onClick={onSwitchToMarketplace}
                  className="gap-2"
                >
                  <Store className="h-4 w-4" />
                  View Marketplace
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
