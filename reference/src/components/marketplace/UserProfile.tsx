import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Edit,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Download
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

export function UserProfile({ activeTab = "profile" }: { activeTab?: string }) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ahmad Rizal bin Abdullah",
    email: "ahmad.rizal@email.com",
    phone: "+60 12-345 6789",
    address: "No. 15, Jalan Merdeka, 50100 Kuala Lumpur",
    driverLicense: "D1234567"
  });

  const bookings = [
    {
      id: 1,
      car: {
        make: "Toyota",
        model: "Camry",
        year: 2023,
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400"
      },
      startDate: "2024-10-20",
      endDate: "2024-10-25",
      status: "upcoming",
      totalAmount: 945,
      bookingRef: "VR20241015001"
    },
    {
      id: 2,
      car: {
        make: "Honda",
        model: "Civic",
        year: 2022,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400"
      },
      startDate: "2024-09-15",
      endDate: "2024-09-18",
      status: "completed",
      totalAmount: 441,
      bookingRef: "VR20240910001",
      rating: 5
    },
    {
      id: 3,
      car: {
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400"
      },
      startDate: "2024-08-10",
      endDate: "2024-08-15",
      status: "completed",
      totalAmount: 1470,
      bookingRef: "VR20240805001",
      rating: 5
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancelBooking = (bookingId: number) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      console.log("Cancelling booking:", bookingId);
      toast.success("Booking cancelled successfully");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-20 w-20 md:h-24 md:w-24">
                <AvatarFallback className="text-2xl">AR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{profileData.name}</h1>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {profileData.phone}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 self-start">
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">Driver License</Label>
                    <Input
                      id="license"
                      value={profileData.driverLicense}
                      onChange={(e) => setProfileData(prev => ({ ...prev, driverLicense: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold mb-1">3</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold mb-1">2</p>
                  <p className="text-sm text-muted-foreground">Completed Trips</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold mb-1">5.0</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Car Image */}
                      <div className="md:col-span-3">
                        <div className="relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={booking.car.image}
                            alt={`${booking.car.make} ${booking.car.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="md:col-span-6 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold">
                              {booking.car.year} {booking.car.make} {booking.car.model}
                            </h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Booking Ref: {booking.bookingRef}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Pickup</p>
                              <p className="font-semibold">{new Date(booking.startDate).toLocaleDateString('en-MY')}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Return</p>
                              <p className="font-semibold">{new Date(booking.endDate).toLocaleDateString('en-MY')}</p>
                            </div>
                          </div>
                        </div>

                        {booking.status === "completed" && booking.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground mr-1">Your Rating:</span>
                            {[...Array(booking.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-3 flex flex-col justify-between">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">RM {booking.totalAmount}</p>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                          {booking.status === "upcoming" && (
                            <>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Modify Booking
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === "completed" && (
                            <>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download Invoice
                              </Button>
                              {!booking.rating && (
                                <Button size="sm">
                                  <Star className="h-4 w-4 mr-2" />
                                  Rate Experience
                                </Button>
                              )}
                            </>
                          )}
                          {booking.status === "active" && (
                            <Button variant="outline" size="sm">
                              <MapPin className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {bookings.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start your journey by booking your first car!
                    </p>
                    <Button>Browse Cars</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
