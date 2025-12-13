import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { 
  Search, 
  SlidersHorizontal,
  Star,
  ChevronRight,
  X
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export function BrowseCars({ onViewCar }: { onViewCar: (car: any) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const cars = [
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
      available: true
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
      available: true
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
      available: true
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
      available: false
    },
    {
      id: 5,
      make: "Mercedes",
      model: "C-Class",
      year: 2024,
      dailyRate: 357,
      rating: 4.9,
      reviews: 142,
      category: "Luxury",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      features: ["Auto", "Petrol", "5 Seats"],
      available: true
    },
    {
      id: 6,
      make: "Ford",
      model: "Mustang",
      year: 2023,
      dailyRate: 273,
      rating: 4.7,
      reviews: 76,
      category: "Sports",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
      features: ["Auto", "Petrol", "4 Seats"],
      available: true
    }
  ];

  const categories = ["Sedan", "SUV", "Electric", "Luxury", "Sports", "MPV"];
  const features = ["Auto", "Manual", "Petrol", "Diesel", "Hybrid", "Electric"];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = car.dailyRate >= priceRange[0] && car.dailyRate <= priceRange[1];
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(car.category);
    
    const matchesFeatures = selectedFeatures.length === 0 ||
      selectedFeatures.some(feature => car.features.includes(feature));
    
    return matchesSearch && matchesPrice && matchesCategory && matchesFeatures;
  });

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Price Range (per day)</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            step={10}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">RM {priceRange[0]}</span>
            <span className="font-medium">RM {priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Features</Label>
        <div className="space-y-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => toggleFeature(feature)}
              />
              <label
                htmlFor={`feature-${feature}`}
                className="text-sm cursor-pointer"
              >
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 || selectedFeatures.length > 0) && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedCategories([]);
            setSelectedFeatures([]);
            setPriceRange([0, 500]);
          }}
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Cars</h1>
        <p className="text-muted-foreground">Find your perfect ride from our collection</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by make or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="lg" className="md:hidden gap-2">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <aside className="hidden md:block lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>
              <FilterContent />
            </CardContent>
          </Card>
        </aside>

        {/* Car Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
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
                    {!car.available && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <Badge variant="destructive" className="text-sm">
                          Not Available
                        </Badge>
                      </div>
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
                      <Button 
                        size="sm" 
                        className="gap-2"
                        disabled={!car.available}
                      >
                        {car.available ? 'View Details' : 'Unavailable'}
                        {car.available && <ChevronRight className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12">
              <div className="text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories([]);
                    setSelectedFeatures([]);
                    setPriceRange([0, 500]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
