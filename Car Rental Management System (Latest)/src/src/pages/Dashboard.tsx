import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Car, Users, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { Badge } from "../components/ui/badge";

export function Dashboard() {
  const stats = [
    {
      title: "Total Cars",
      value: "24",
      icon: Car,
      change: "+2 from last month"
    },
    {
      title: "Active Rentals",
      value: "18",
      icon: Users,
      change: "+12% from last month"
    },
    {
      title: "Monthly Revenue",
      value: "RM 52,340",
      icon: DollarSign,
      change: "+8% from last month"
    },
    {
      title: "Available Cars",
      value: "6",
      icon: Calendar,
      change: "Ready to rent"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New rental started",
      customer: "Ahmad Rizal",
      car: "Toyota Camry 2023",
      time: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      action: "Payment due",
      customer: "Siti Nurhaliza",
      car: "Honda Civic 2022",
      time: "4 hours ago",
      status: "warning"
    },
    {
      id: 3,
      action: "Car returned",
      customer: "Mohd Faizal",
      car: "BMW X3 2023",
      time: "6 hours ago",
      status: "completed"
    },
    {
      id: 4,
      action: "New car added",
      customer: "System",
      car: "Mercedes C-Class 2024",
      time: "1 day ago",
      status: "info"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your car rental management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.status === 'active' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'completed' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.customer} • {activity.car}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    activity.status === 'warning' ? 'destructive' : 
                    activity.status === 'active' ? 'default' : 
                    'secondary'
                  }>
                    {activity.status === 'warning' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
