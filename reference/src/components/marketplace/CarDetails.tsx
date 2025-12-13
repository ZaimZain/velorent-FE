import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Star,
  MapPin,
  ChevronLeft,
  Calendar,
  Shield,
  Fuel,
  Users,
  Gauge,
  Settings,
  Check,
  Heart,
  Share2,
  MessageCircle
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function CarDetails({ 
  car, 
  onBook, 
  onBack 
}: { 
  car: any; 
  onBook: (car: any) => void;
  onBack: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Car not found</p>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </Card>
      </div>
    );
  }

  const images = [
    car.image,
    car.image,
    car.image,
    car.image
  ];

  const specifications = [
    { icon: Users, label: "Seats", value: "5 Seats" },
    { icon: Settings, label: "Transmission", value: "Automatic" },
    { icon: Fuel, label: "Fuel Type", value: "Hybrid" },
    { icon: Gauge, label: "Mileage", value: "25,000 km" }
  ];

  const features = [
    "Air Conditioning",
    "Bluetooth",
    "Backup Camera",
    "GPS Navigation",
    "USB Charging Ports",
    "Cruise Control",
    "Keyless Entry",
    "Power Windows",
    "ABS Brakes",
    "Airbags"
  ];

  const reviews = [
    {
      id: 1,
      author: "Ahmad Rizal",
      rating: 5,
      date: "2 days ago",
      comment: "Kereta sangat selesa dan bersih. Perkhidmatan yang sangat baik!"
    },
    {
      id: 2,
      author: "Siti Nurhaliza",
      rating: 5,
      date: "1 week ago",
      comment: "Highly recommended! The car was in excellent condition."
    },
    {
      id: 3,
      author: "Mohd Faizal",
      rating: 4,
      date: "2 weeks ago",
      comment: "Great experience. Will rent again for my next trip."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 bg-card border-b">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Desktop Back Button */}
        <Button 
          variant="ghost" 
          className="hidden md:flex gap-2 mb-6"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={images[selectedImage]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {car.category}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {car.year} {car.make} {car.model}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">{car.rating}</span>
                        <span>({car.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>Kuala Lumpur</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-semibold">Fully Insured</span> - Comprehensive coverage included
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">Specs</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {specifications.map((spec, idx) => {
                        const Icon = spec.icon;
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">{spec.label}</p>
                              <p className="font-semibold">{spec.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Features & Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">Customer Reviews</h3>
                        <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">{car.rating}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarFallback>{review.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold">{review.author}</p>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" 
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Card - Desktop */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 hidden lg:block">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-primary">RM {car.dailyRate}</span>
                    <span className="text-muted-foreground">/ day</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Best price guarantee</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pickup Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Return Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => onBook(car)}
                >
                  Book Now
                </Button>

                <div className="space-y-2 pt-4 border-t text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal (3 days)</span>
                    <span className="font-semibold">RM {car.dailyRate * 3}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Insurance</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">RM {car.dailyRate * 3}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Owner
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Booking Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 lg:hidden bg-card border-t shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-primary">RM {car.dailyRate}</p>
              <p className="text-xs text-muted-foreground">per day</p>
            </div>
            <Button 
              size="lg" 
              className="flex-1 max-w-xs"
              onClick={() => onBook(car)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
