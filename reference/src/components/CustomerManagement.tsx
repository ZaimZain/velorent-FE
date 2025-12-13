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
  User, 
  Search, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Car,
  Plus,
  Filter
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    driverLicense: "",
    notes: ""
  });

  const customers = [
    {
      id: 1,
      name: "Ahmad Rizal bin Abdullah",
      email: "ahmad.rizal@email.com",
      phone: "+60 12-345 6789",
      address: "No. 15, Jalan Merdeka, 50100 Kuala Lumpur",
      driverLicense: "D1234567",
      registrationDate: "2024-01-15",
      totalRentals: 8,
      totalSpent: 9828,
      status: "active",
      notes: "Pelanggan utama, sentiasa membayar tepat pada masanya",
      currentRental: {
        car: "Toyota Camry 2023",
        startDate: "2024-09-20",
        endDate: "2024-10-01"
      }
    },
    {
      id: 2,
      name: "Siti Nurhaliza binti Hassan",
      email: "siti.nurhaliza@email.com",
      phone: "+60 13-987 6543",
      address: "No. 28, Jalan Bukit Bintang, 55100 Kuala Lumpur",
      driverLicense: "D9876543",
      registrationDate: "2024-03-22",
      totalRentals: 3,
      totalSpent: 3738,
      status: "warning",
      notes: "Pembayaran lewat pada sewa terakhir",
      currentRental: {
        car: "Ford Mustang 2023",
        startDate: "2024-09-25",
        endDate: "2024-09-28"
      }
    },
    {
      id: 3,
      name: "Mohd Faizal bin Omar",
      email: "mohd.faizal@email.com",
      phone: "+60 17-456 7890",
      address: "No. 42, Jalan Sultan, 80000 Johor Bahru",
      driverLicense: "D4567891",
      registrationDate: "2023-11-08",
      totalRentals: 12,
      totalSpent: 18984,
      status: "active",
      notes: "Pelanggan VIP, kerap menyewa kenderaan mewah",
      currentRental: null
    },
    {
      id: 4,
      name: "Nurul Aisyah binti Ibrahim",
      email: "nurul.aisyah@email.com",
      phone: "+60 19-321 9876",
      address: "No. 7, Jalan Alor, 10450 Georgetown, Pulau Pinang",
      driverLicense: "D3219876",
      registrationDate: "2024-06-12",
      totalRentals: 1,
      totalSpent: 1176,
      status: "active",
      notes: "Pelanggan baru, sewa pertama berjalan lancar",
      currentRental: null
    },
    {
      id: 5,
      name: "Azman bin Hashim",
      email: "azman.hashim@email.com",
      phone: "+60 16-654 3210",
      address: "No. 88, Jalan Tun Razak, 50400 Kuala Lumpur",
      driverLicense: "D6543210",
      registrationDate: "2023-08-19",
      totalRentals: 6,
      totalSpent: 6552,
      status: "inactive",
      notes: "Tidak menyewa lebih 6 bulan",
      currentRental: null
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      driverLicense: "",
      notes: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      driverLicense: customer.driverLicense,
      notes: customer.notes
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedCustomer) {
      console.log("Updating customer:", selectedCustomer.id, formData);
      toast.success("Customer information updated successfully!");
    } else {
      console.log("Adding new customer:", formData);
      toast.success("Customer added successfully!");
    }
    
    setIsDialogOpen(false);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (customerId: number, customerName: string) => {
    if (window.confirm(`Are you sure you want to delete ${customerName}? This action cannot be undone.`)) {
      console.log("Deleting customer:", customerId);
      toast.success("Customer deleted successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Customer Management</h1>
        <p className="text-muted-foreground">Manage your rental customers and their information</p>
      </div>

      {/* Search, Filter and Add Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, email, or phone number..."
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
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddCustomer}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <Badge className={getStatusColor(customer.status)} variant="outline">
                  {customer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{customer.address}</span>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{customer.totalRentals}</p>
                    <p className="text-xs text-muted-foreground">Total Rentals</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">RM {customer.totalSpent}</p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                </div>

                {/* Current Rental */}
                {customer.currentRental && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Current Rental</span>
                    </div>
                    <p className="text-sm">{customer.currentRental.car}</p>
                    <p className="text-xs text-muted-foreground">
                      {customer.currentRental.startDate} - {customer.currentRental.endDate}
                    </p>
                  </div>
                )}

                {/* Registration Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {customer.registrationDate}</span>
                </div>

                {/* Notes */}
                {customer.notes && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">{customer.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditCustomer(customer)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No customers found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      )}

      {/* Add/Edit Customer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCustomer ? "Edit Customer Information" : "Add New Customer"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Ahmad Rizal bin Abdullah"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g., ahmad.rizal@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="e.g., +60 12-345 6789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">Driver License</Label>
                <Input
                  id="license"
                  value={formData.driverLicense}
                  onChange={(e) => setFormData(prev => ({ ...prev, driverLicense: e.target.value }))}
                  placeholder="e.g., D1234567"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="e.g., No. 15, Jalan Merdeka, 50100 Kuala Lumpur"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any additional notes about this customer..."
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSubmit}>
                {selectedCustomer ? "Save Changes" : "Add Customer"}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
