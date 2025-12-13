import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Plus, Car } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function AddCarForm() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.make || !formData.model || !formData.year || !formData.licensePlate || !formData.dailyRate) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically save to a database
    console.log("Adding new car:", formData);
    toast.success("Car added successfully!");
    
    // Reset form
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
        <h1>Add New Car</h1>
        <p className="text-muted-foreground">Register a new vehicle to your rental fleet</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
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
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Car to Fleet
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setFormData({
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
                })}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}