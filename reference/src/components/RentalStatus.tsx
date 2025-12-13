import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { 
  Car, 
  User, 
  Calendar, 
  DollarSign, 
  Search, 
  Filter,
  MapPin,
  Phone,
  Mail,
  Clock,
  Plus
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function RentalStatus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRental, setSelectedRental] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [rentalFormData, setRentalFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    carSelection: "",
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dailyRate: "",
    notes: ""
  });

  const rentals = [
    {
      id: 1,
      customer: {
        name: "Ahmad Rizal bin Abdullah",
        email: "ahmad.rizal@email.com",
        phone: "+60 12-345 6789"
      },
      car: {
        make: "Toyota",
        model: "Camry",
        year: 2023,
        licensePlate: "ABC-123"
      },
      startDate: "2024-09-20",
      endDate: "2024-10-01",
      dailyRate: 189,
      totalAmount: 2079,
      paidAmount: 1039.50,
      status: "active",
      pickupLocation: "Pejabat Pusat Bandar",
      paymentStatus: "partial"
    },
    {
      id: 2,
      customer: {
        name: "Siti Nurhaliza binti Hassan",
        email: "siti.nurhaliza@email.com",
        phone: "+60 13-987 6543"
      },
      car: {
        make: "Ford",
        model: "Mustang",
        year: 2023,
        licensePlate: "MNO-345"
      },
      startDate: "2024-09-25",
      endDate: "2024-09-28",
      dailyRate: 273,
      totalAmount: 819,
      paidAmount: 0,
      status: "active",
      pickupLocation: "Terminal Lapangan Terbang",
      paymentStatus: "overdue"
    },
    {
      id: 3,
      customer: {
        name: "Mohd Faizal bin Omar",
        email: "mohd.faizal@email.com",
        phone: "+60 17-456 7890"
      },
      car: {
        make: "BMW",
        model: "X3",
        year: 2023,
        licensePlate: "GHI-789"
      },
      startDate: "2024-09-15",
      endDate: "2024-09-22",
      dailyRate: 315,
      totalAmount: 2205,
      paidAmount: 2205,
      status: "completed",
      pickupLocation: "Pejabat Pusat Bandar",
      paymentStatus: "paid"
    },
    {
      id: 4,
      customer: {
        name: "Nurul Aisyah binti Ibrahim",
        email: "nurul.aisyah@email.com",
        phone: "+60 19-321 9876"
      },
      car: {
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        licensePlate: "PQR-678"
      },
      startDate: "2024-10-01",
      endDate: "2024-10-05",
      dailyRate: 294,
      totalAmount: 1176,
      paidAmount: 1176,
      status: "upcoming",
      pickupLocation: "Parking Pusat Membeli-belah",
      paymentStatus: "paid"
    }
  ];

  const filteredRentals = rentals.filter(rental => {
    const matchesSearch = 
      rental.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || rental.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = (rental: any) => {
    setSelectedRental(rental);
    setIsDetailsDialogOpen(true);
  };

  const handleAddRental = () => {
    setRentalFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      carSelection: "",
      startDate: "",
      endDate: "",
      pickupLocation: "",
      dailyRate: "",
      notes: ""
    });
    setIsAddDialogOpen(true);
  };

  const handleSubmitRental = () => {
    if (!rentalFormData.customerName || !rentalFormData.carSelection || !rentalFormData.startDate || !rentalFormData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    console.log("Adding new rental:", rentalFormData);
    toast.success("Rental created successfully!");
    setIsAddDialogOpen(false);
  };

  const handleSendReminder = (rental: any) => {
    console.log("Sending payment reminder to:", rental.customer.email);
    toast.success(`Payment reminder sent to ${rental.customer.name}`);
  };

  const handleEndRental = (rental: any) => {
    if (window.confirm(`Are you sure you want to end the rental for ${rental.customer.name}?`)) {
      console.log("Ending rental:", rental.id);
      toast.success("Rental ended successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Rental Status</h1>
        <p className="text-muted-foreground">Track and manage all your active and past rentals</p>
      </div>

      {/* Search, Filter and Add Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by customer name, car, or license plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddRental}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Rental
        </Button>
      </div>

      {/* Rentals List */}
      <div className="space-y-4">
        {filteredRentals.map((rental) => (
          <Card key={rental.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Customer Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Customer</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{rental.customer.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{rental.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{rental.customer.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Car Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Vehicle</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {rental.car.year} {rental.car.make} {rental.car.model}
                    </p>
                    <p className="text-sm text-muted-foreground">{rental.car.licensePlate}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{rental.pickupLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Rental Period */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Rental Period</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">From:</span> {rental.startDate}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">To:</span> {rental.endDate}
                    </p>
                    {rental.status === "active" && (
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {calculateDaysRemaining(rental.endDate)} days remaining
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Payment</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Total:</span> RM {rental.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Paid:</span> RM {rental.paidAmount.toFixed(2)}
                    </p>
                    {rental.paidAmount < rental.totalAmount && (
                      <p className="text-sm text-red-600">
                        <span className="text-muted-foreground">Due:</span> RM {(rental.totalAmount - rental.paidAmount).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(rental.status)} variant="outline">
                    {rental.status}
                  </Badge>
                  <Badge className={getPaymentStatusColor(rental.paymentStatus)} variant="outline">
                    {rental.paymentStatus}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(rental)}
                  >
                    View Details
                  </Button>
                  {rental.paymentStatus === "overdue" && (
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleSendReminder(rental)}
                    >
                      Send Reminder
                    </Button>
                  )}
                  {rental.status === "active" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEndRental(rental)}
                    >
                      End Rental
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRentals.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No rentals found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* View Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rental Details</DialogTitle>
          </DialogHeader>
          {selectedRental && (
            <div className="space-y-6">
              {/* Customer Section */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedRental.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedRental.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedRental.customer.phone}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Section */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{selectedRental.car.year} {selectedRental.car.make} {selectedRental.car.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">License Plate</p>
                    <p className="font-medium">{selectedRental.car.licensePlate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Location</p>
                    <p className="font-medium">{selectedRental.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Rate</p>
                    <p className="font-medium">RM {selectedRental.dailyRate}</p>
                  </div>
                </div>
              </div>

              {/* Rental Period Section */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Rental Period
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{selectedRental.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">{selectedRental.endDate}</p>
                  </div>
                  {selectedRental.status === "active" && (
                    <div>
                      <p className="text-sm text-muted-foreground">Days Remaining</p>
                      <p className="font-medium">{calculateDaysRemaining(selectedRental.endDate)} days</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Section */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-medium">RM {selectedRental.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Paid Amount</p>
                    <p className="font-medium">RM {selectedRental.paidAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                    <p className="font-medium text-red-600">RM {(selectedRental.totalAmount - selectedRental.paidAmount).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={getPaymentStatusColor(selectedRental.paymentStatus)} variant="outline">
                      {selectedRental.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New Rental Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Rental</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    placeholder="e.g., Ahmad Rizal bin Abdullah"
                    value={rentalFormData.customerName}
                    onChange={(e) => setRentalFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder="e.g., ahmad.rizal@email.com"
                    value={rentalFormData.customerEmail}
                    onChange={(e) => setRentalFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone</Label>
                <Input
                  id="customerPhone"
                  placeholder="e.g., +60 12-345 6789"
                  value={rentalFormData.customerPhone}
                  onChange={(e) => setRentalFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                />
              </div>
            </div>

            {/* Rental Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Rental Details</h3>
              <div className="space-y-2">
                <Label htmlFor="carSelection">Select Car *</Label>
                <Select 
                  value={rentalFormData.carSelection} 
                  onValueChange={(value) => setRentalFormData(prev => ({ ...prev, carSelection: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a car" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota-camry">Toyota Camry 2023 (ABC-123)</SelectItem>
                    <SelectItem value="honda-civic">Honda Civic 2022 (DEF-456)</SelectItem>
                    <SelectItem value="bmw-x3">BMW X3 2023 (GHI-789)</SelectItem>
                    <SelectItem value="mercedes-c">Mercedes C-Class 2024 (JKL-012)</SelectItem>
                    <SelectItem value="tesla-3">Tesla Model 3 2023 (PQR-678)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={rentalFormData.startDate}
                    onChange={(e) => setRentalFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={rentalFormData.endDate}
                    onChange={(e) => setRentalFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Input
                    id="pickupLocation"
                    placeholder="e.g., Pejabat Pusat Bandar"
                    value={rentalFormData.pickupLocation}
                    onChange={(e) => setRentalFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dailyRate">Daily Rate (RM)</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    placeholder="e.g., 189"
                    value={rentalFormData.dailyRate}
                    onChange={(e) => setRentalFormData(prev => ({ ...prev, dailyRate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Add any additional notes about this rental..."
                  value={rentalFormData.notes}
                  onChange={(e) => setRentalFormData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSubmitRental}>Create Rental</Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
