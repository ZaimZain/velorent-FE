import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  ChevronLeft,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
  Check,
  Shield,
  Clock
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner@2.0.3";

export function BookingFlow({ 
  car, 
  onBack 
}: { 
  car: any; 
  onBack: () => void;
}) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "Kuala Lumpur",
    fullName: "",
    email: "",
    phone: "",
    driverLicense: "",
    address: "",
    specialRequests: "",
    paymentMethod: "card"
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const calculateDays = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate) return 0;
    const pickup = new Date(bookingData.pickupDate);
    const returnDate = new Date(bookingData.returnDate);
    const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const days = calculateDays();
  const subtotal = days * car.dailyRate;
  const insurance = 0; // Included
  const total = subtotal + insurance;

  const handleNext = () => {
    if (step === 1) {
      if (!bookingData.pickupDate || !bookingData.returnDate) {
        toast.error("Please select pickup and return dates");
        return;
      }
      if (days <= 0) {
        toast.error("Return date must be after pickup date");
        return;
      }
    }
    
    if (step === 2) {
      if (!bookingData.fullName || !bookingData.email || !bookingData.phone || !bookingData.driverLicense) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    console.log("Booking submitted:", bookingData);
    toast.success("Booking confirmed! You'll receive a confirmation email shortly.");
    // In real app, this would send to your rental management system
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h2 className="font-semibold">Complete Your Booking</h2>
              <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Rental Details */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Rental Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-date">Pickup Date *</Label>
                      <Input
                        id="pickup-date"
                        type="date"
                        value={bookingData.pickupDate}
                        onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="return-date">Return Date *</Label>
                      <Input
                        id="return-date"
                        type="date"
                        value={bookingData.returnDate}
                        onChange={(e) => handleInputChange("returnDate", e.target.value)}
                        min={bookingData.pickupDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {days > 0 && (
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm">
                        <span className="font-semibold">Rental Duration:</span> {days} day{days !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="pickup-location">Pickup Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="pickup-location"
                        placeholder="Enter pickup location"
                        className="pl-10"
                        value={bookingData.pickupLocation}
                        onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="special-requests"
                      placeholder="Any special requests or requirements?"
                      rows={3}
                      value={bookingData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Personal Information */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name *</Label>
                    <Input
                      id="full-name"
                      placeholder="e.g., Ahmad Rizal bin Abdullah"
                      value={bookingData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+60 12-345 6789"
                          className="pl-10"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driver-license">Driver License Number *</Label>
                    <Input
                      id="driver-license"
                      placeholder="e.g., D1234567"
                      value={bookingData.driverLicense}
                      onChange={(e) => handleInputChange("driverLicense", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Your full address"
                      rows={3}
                      value={bookingData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-200">
                      <p className="font-semibold mb-1">Your information is secure</p>
                      <p className="text-blue-700 dark:text-blue-300">
                        We use industry-standard encryption to protect your personal data.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup 
                    value={bookingData.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">Credit/Debit Card</p>
                              <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                            </div>
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex-1 cursor-pointer">
                          <div>
                            <p className="font-semibold">Bank Transfer</p>
                            <p className="text-sm text-muted-foreground">Direct transfer to our account</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="ewallet" id="ewallet" />
                        <Label htmlFor="ewallet" className="flex-1 cursor-pointer">
                          <div>
                            <p className="font-semibold">E-Wallet</p>
                            <p className="text-sm text-muted-foreground">Touch 'n Go, GrabPay, etc.</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {bookingData.paymentMethod === "card" && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={3}
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-green-900 dark:text-green-200">
                      <p className="font-semibold mb-1">Secure Payment</p>
                      <p className="text-green-700 dark:text-green-300">
                        Your payment information is encrypted and secure.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              {step < totalSteps ? (
                <Button onClick={handleNext} className="flex-1">
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex-1">
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Car Info */}
                <div className="flex gap-3">
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs">
                      {car.category}
                    </Badge>
                    <p className="font-semibold">
                      {car.year} {car.make} {car.model}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  {bookingData.pickupDate && bookingData.returnDate && (
                    <>
                      <div className="flex items-start gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-muted-foreground">Pickup</p>
                          <p className="font-semibold">{new Date(bookingData.pickupDate).toLocaleDateString('en-MY')}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-muted-foreground">Return</p>
                          <p className="font-semibold">{new Date(bookingData.returnDate).toLocaleDateString('en-MY')}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-semibold">{days} day{days !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {bookingData.pickupLocation && (
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-semibold">{bookingData.pickupLocation}</p>
                      </div>
                    </div>
                  )}
                </div>

                {days > 0 && (
                  <div className="space-y-2 pt-4 border-t text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal ({days} days)</span>
                      <span className="font-semibold">RM {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Insurance</span>
                      <span className="font-semibold text-green-600">Included</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">RM {total.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
