import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronLeft, ChevronRight, Calendar, Car, User } from "lucide-react";

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month");

  // Sample rental data
  const rentals = [
    {
      id: 1,
      customer: "John Smith",
      car: "Toyota Camry 2023",
      startDate: new Date(2024, 8, 20), // September 20, 2024
      endDate: new Date(2024, 9, 1),    // October 1, 2024
      status: "active"
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      car: "Ford Mustang 2023",
      startDate: new Date(2024, 8, 25),
      endDate: new Date(2024, 8, 28),
      status: "active"
    },
    {
      id: 3,
      customer: "Emily Davis",
      car: "Tesla Model 3 2023",
      startDate: new Date(2024, 9, 1),
      endDate: new Date(2024, 9, 5),
      status: "upcoming"
    },
    {
      id: 4,
      customer: "Mike Brown",
      car: "BMW X3 2023",
      startDate: new Date(2024, 8, 15),
      endDate: new Date(2024, 8, 22),
      status: "completed"
    }
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getRentalsForDate = (date: Date | null) => {
    if (!date) return [];
    
    return rentals.filter(rental => {
      const rentalStart = new Date(rental.startDate);
      const rentalEnd = new Date(rental.endDate);
      
      // Check if the date falls within the rental period
      return date >= rentalStart && date <= rentalEnd;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div>
        <h1>Calendar & Availability</h1>
        <p className="text-muted-foreground">View rental schedules and car availability</p>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedView === "month" && (
            <div className="space-y-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dayRentals = getRentalsForDate(day);
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-24 p-1 border rounded-lg ${
                        day ? 'bg-card hover:bg-muted/50' : 'bg-transparent'
                      } ${isToday(day) ? 'ring-2 ring-primary' : ''}`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm mb-1 ${isToday(day) ? 'font-bold text-primary' : ''}`}>
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayRentals.slice(0, 2).map(rental => (
                              <div
                                key={rental.id}
                                className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                                title={`${rental.customer} - ${rental.car}`}
                              >
                                {rental.customer}
                              </div>
                            ))}
                            {dayRentals.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{dayRentals.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Rentals Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Active & Upcoming Rentals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rentals
              .filter(rental => rental.status === "active" || rental.status === "upcoming")
              .map(rental => (
                <div key={rental.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{rental.car}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{rental.customer}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">
                        {rental.startDate.toLocaleDateString()} - {rental.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(rental.status)} variant="outline">
                      {rental.status}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
              <span className="text-sm">Active Rental</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200"></div>
              <span className="text-sm">Upcoming Rental</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200"></div>
              <span className="text-sm">Completed Rental</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-primary"></div>
              <span className="text-sm">Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}