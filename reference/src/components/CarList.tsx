import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Car, Edit, Trash2, Search, Filter, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

export function CarList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<any>(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    color: "",
    fuelType: "",
    dailyRate: "",
    mileage: "",
    description: "",
    features: ""
  });

  const cars = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      licensePlate: "ABC-123",
      status: "rented",
      color: "Silver",
      fuelType: "Hybrid",
      dailyRate: 189,
      currentRenter: "Ahmad Rizal",
      dueDate: "2024-10-01",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400"
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2022,
      licensePlate: "DEF-456",
      status: "available",
      color: "Blue",
      fuelType: "Gasoline",
      dailyRate: 147,
      currentRenter: null,
      dueDate: null,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400"
    },
    {
      id: 3,
      make: "BMW",
      model: "X3",
      year: 2023,
      licensePlate: "GHI-789",
      status: "maintenance",
      color: "Black",
      fuelType: "Gasoline",
      dailyRate: 315,
      currentRenter: null,
      dueDate: null,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400"
    },
    {
      id: 4,
      make: "Mercedes",
      model: "C-Class",
      year: 2024,
      licensePlate: "JKL-012",
      status: "available",
      color: "White",
      fuelType: "Gasoline",
      dailyRate: 357,
      currentRenter: null,
      dueDate: null,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400"
    },
    {
      id: 5,
      make: "Ford",
      model: "Mustang",
      year: 2023,
      licensePlate: "MNO-345",
      status: "rented",
      color: "Red",
      fuelType: "Gasoline",
      dailyRate: 273,
      currentRenter: "Siti Nurhaliza",
      dueDate: "2024-09-28",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400"
    },
    {
      id: 6,
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      licensePlate: "PQR-678",
      status: "available",
      color: "Blue",
      fuelType: "Electric",
      dailyRate: 294,
      currentRenter: null,
      dueDate: null,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400"
    }
  ];

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "rented":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddCar = () => {
    setEditingCar(null);
    setFormData({
      make: "",
      model: "",
      year: "",
      licensePlate: "",
      color: "",
      fuelType: "",
      dailyRate: "",
      mileage: "",
      description: "",
      features: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditCar = (car: any) => {
    setEditingCar(car);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year.toString(),
      licensePlate: car.licensePlate,
      color: car.color,
      fuelType: car.fuelType,
      dailyRate: car.dailyRate.toString(),
      mileage: "",
      description: "",
      features: ""
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.make || !formData.model || !formData.year || !formData.licensePlate || !formData.dailyRate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingCar) {
      console.log("Updating car:", editingCar.id, formData);
      toast.success("Car updated successfully!");
    } else {
      console.log("Adding new car:", formData);
      toast.success("Car added successfully!");
    }
    
    setIsDialogOpen(false);
    setEditingCar(null);
  };

  const handleDeleteCar = (carId: number, carName: string) => {
    if (window.confirm(`Are you sure you want to delete ${carName}? This action cannot be undone.`)) {
      console.log("Deleting car:", carId);
      toast.success("Car deleted successfully!");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div>
        <h1>Car Fleet</h1>
        <p className="text-muted-foreground">Manage your rental car inventory</p>
      </div>

      {/* Search, Filter and Add Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by make, model, or license plate..."
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
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddCar}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Car
        </Button>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card key={car.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <ImageWithFallback
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <Badge 
                className={`absolute top-3 right-3 ${getStatusColor(car.status)}`}
                variant="outline"
              >
                {car.status}
              </Badge>
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {car.year} {car.make} {car.model}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Car className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{car.licensePlate}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Color:</span>
                  <span>{car.color}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fuel:</span>
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily Rate:</span>
                  <span className="font-semibold">RM {car.dailyRate}</span>
                </div>
                {car.status === "rented" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Renter:</span>
                      <span>{car.currentRenter}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Due:</span>
                      <span className="text-red-600">{car.dueDate}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditCar(car)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleDeleteCar(car.id, `${car.make} ${car.model}`)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-12">
          <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No cars found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Add/Edit Car Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCar ? "Edit Car" : "Add New Car"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  placeholder="e.g., Toyota"
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  placeholder="e.g., Camry"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* License and Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate *</Label>
                <Input
                  id="licensePlate"
                  placeholder="e.g., ABC-123"
                  value={formData.licensePlate}
                  onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="e.g., Silver"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gasoline">Gasoline</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pricing and Mileage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dailyRate">Daily Rate (RM) *</Label>
                <Input
                  id="dailyRate"
                  type="number"
                  placeholder="e.g., 189"
                  value={formData.dailyRate}
                  onChange={(e) => handleInputChange("dailyRate", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mileage">Current Mileage</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="e.g., 25000"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>
            </div>

            {/* Description and Features */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the vehicle condition, special features, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Textarea
                  id="features"
                  placeholder="List special features: GPS, Bluetooth, Backup Camera, etc."
                  value={formData.features}
                  onChange={(e) => handleInputChange("features", e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit">
                {editingCar ? "Save Changes" : "Add Car to Fleet"}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
