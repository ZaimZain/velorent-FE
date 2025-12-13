import { useState } from "react";
import { VelorentLogo } from "./components/VelorentLogo";
import { MarketplaceHome } from "./components/marketplace/MarketplaceHome";
import { BrowseCars } from "./components/marketplace/BrowseCars";
import { CarDetails } from "./components/marketplace/CarDetails";
import { BookingFlow } from "./components/marketplace/BookingFlow";
import { UserProfile } from "./components/marketplace/UserProfile";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { 
  Home, 
  Search, 
  Calendar, 
  User,
  Menu,
  X,
  Phone,
  Mail,
  Settings,
  LayoutDashboard
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";

export default function MarketplaceApp({ onSwitchToManagement }: { onSwitchToManagement?: () => void }) {
  const [activeView, setActiveView] = useState("home");
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "browse", label: "Browse", icon: Search },
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "profile", label: "Profile", icon: User }
  ];

  const handleViewCar = (car: any) => {
    setSelectedCar(car);
    setActiveView("details");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookCar = (car: any) => {
    setSelectedCar(car);
    setActiveView("booking");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <MarketplaceHome onViewCar={handleViewCar} onBrowseAll={() => setActiveView("browse")} />;
      case "browse":
        return <BrowseCars onViewCar={handleViewCar} />;
      case "details":
        return <CarDetails car={selectedCar} onBook={handleBookCar} onBack={() => setActiveView("browse")} />;
      case "booking":
        return <BookingFlow car={selectedCar} onBack={() => setActiveView("details")} />;
      case "bookings":
        return <UserProfile activeTab="bookings" />;
      case "profile":
        return <UserProfile activeTab="profile" />;
      default:
        return <MarketplaceHome onViewCar={handleViewCar} onBrowseAll={() => setActiveView("browse")} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop/Tablet Header */}
      <header className="sticky top-0 z-40 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div 
              className="cursor-pointer flex-shrink-0" 
              onClick={() => setActiveView("home")}
            >
              <VelorentLogo className="scale-75 lg:scale-100" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => setActiveView(item.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Contact & Menu */}
            <div className="flex items-center gap-2">
              {onSwitchToManagement && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSwitchToManagement}
                  className="hidden md:flex gap-2 border-primary/30"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Owner Dashboard
                </Button>
              )}
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <Mail className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-64 bg-card border-l shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Menu</h3>
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
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      setActiveView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
            <div className="mt-8 pt-6 border-t space-y-2">
              {onSwitchToManagement && (
                <Button 
                  className="w-full justify-start gap-3 mb-4"
                  onClick={() => {
                    onSwitchToManagement();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Owner Dashboard
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start gap-3">
                <Phone className="h-4 w-4" />
                +60 12-345 6789
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Mail className="h-4 w-4" />
                support@velorent.my
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card border-t shadow-lg">
        <div className="grid grid-cols-4 h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Toaster />
    </div>
  );
}
