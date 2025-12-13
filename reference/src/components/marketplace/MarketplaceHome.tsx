import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Search, 
  MapPin, 
  Calendar, 
  ChevronRight,
  Star,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Users
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function MarketplaceHome({ 
  onViewCar, 
  onBrowseAll 
}: { 
  onViewCar: (car: any) => void;
  onBrowseAll: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Kuala Lumpur");

  const featuredCars = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      dailyRate: 189,
      rating: 4.8,
      reviews: 124,
      category: "Sedan",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      features: ["Auto", "Hybrid", "5 Seats"],
      popular: true
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2022,
      dailyRate: 147,
      rating: 4.7,
      reviews: 89,
      category: "Sedan",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      features: ["Auto", "Petrol", "5 Seats"],
      popular: false
    },
    {
      id: 3,
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      dailyRate: 294,
      rating: 4.9,
      reviews: 156,
      category: "Electric",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
      features: ["Auto", "Electric", "5 Seats"],
      popular: true
    },
    {
      id: 4,
      make: "BMW",
      model: "X3",
      year: 2023,
      dailyRate: 315,
      rating: 4.8,
      reviews: 98,
      category: "SUV",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      features: ["Auto", "Petrol", "5 Seats"],
      popular: false
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book your car in seconds"
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Comprehensive coverage included"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "We're here whenever you need"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: TrendingUp, value: "50+", label: "Cities Covered" },
    { icon: Star, value: "4.8/5", label: "Average Rating" }
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              Malaysia's #1 Car Rental Platform
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Your Perfect
              <span className="text-primary block mt-2">Rental Car Today</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our wide selection of quality vehicles. Book instantly and hit the road!
            </p>

            {/* Search Bar */}
            <Card className="shadow-lg max-w-3xl mx-auto mt-8">
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Pickup Location"
                      className="pl-10 h-12"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-10 h-12"
                      placeholder="Pickup Date"
                    />
                  </div>
                  
                  <Button size="lg" className="h-12 w-full gap-2">
                    <Search className="h-5 w-5" />
                    Search Cars
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Cars</h2>
            <p className="text-muted-foreground">Popular choices for your next journey</p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2" onClick={onBrowseAll}>
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <Card 
              key={car.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => onViewCar(car)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {car.popular && (
                  <Badge className="absolute top-3 left-3 bg-primary">
                    Popular
                  </Badge>
                )}
                <div className="absolute bottom-3 right-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{car.rating}</span>
                    <span className="text-xs text-muted-foreground">({car.reviews})</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 md:p-5">
                <Badge variant="outline" className="mb-2 text-xs">
                  {car.category}
                </Badge>
                
                <h3 className="font-semibold text-lg mb-1">
                  {car.year} {car.make} {car.model}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-3 text-xs text-muted-foreground">
                  {car.features.map((feature, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      {feature}
                      {idx < car.features.length - 1 && <span>•</span>}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-2xl font-bold text-primary">RM {car.dailyRate}</p>
                    <p className="text-xs text-muted-foreground">per day</p>
                  </div>
                  <Button size="sm" className="gap-2">
                    Book Now
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button className="w-full max-w-xs gap-2" onClick={onBrowseAll}>
            View All Cars
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-8">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of satisfied customers. Book your perfect car now!
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="gap-2"
              onClick={onBrowseAll}
            >
              Browse All Cars
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
