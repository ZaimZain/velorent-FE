import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { 
  Bell, 
  AlertCircle, 
  DollarSign, 
  Calendar, 
  Car, 
  User,
  Settings,
  CheckCircle,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "payment_due",
      title: "Pembayaran Lewat",
      message: "Pembayaran Siti Nurhaliza untuk sewa Ford Mustang lewat 2 hari",
      timestamp: new Date("2024-09-26T10:30:00"),
      isRead: false,
      priority: "high",
      customer: "Siti Nurhaliza",
      car: "Ford Mustang 2023",
      amount: "RM 819"
    },
    {
      id: 2,
      type: "rental_ending",
      title: "Sewa Akan Tamat",
      message: "Sewa Toyota Camry Ahmad Rizal akan tamat dalam 2 hari",
      timestamp: new Date("2024-09-26T09:15:00"),
      isRead: false,
      priority: "medium",
      customer: "Ahmad Rizal",
      car: "Toyota Camry 2023",
      endDate: "2024-10-01"
    },
    {
      id: 3,
      type: "maintenance_due",
      title: "Penyelenggaraan Diperlukan",
      message: "BMW X3 2023 perlu penyelenggaraan berjadual",
      timestamp: new Date("2024-09-25T14:20:00"),
      isRead: true,
      priority: "medium",
      car: "BMW X3 2023",
      licensePlate: "GHI-789"
    },
    {
      id: 4,
      type: "new_booking",
      title: "Tempahan Baru Disahkan",
      message: "Nurul Aisyah menempah Tesla Model 3 untuk 1-5 Okt",
      timestamp: new Date("2024-09-25T11:45:00"),
      isRead: true,
      priority: "low",
      customer: "Nurul Aisyah",
      car: "Tesla Model 3 2023"
    },
    {
      id: 5,
      type: "payment_received",
      title: "Pembayaran Diterima",
      message: "Mohd Faizal melengkapkan pembayaran RM 2,205 untuk sewa BMW X3",
      timestamp: new Date("2024-09-24T16:30:00"),
      isRead: true,
      priority: "low",
      customer: "Mohd Faizal",
      amount: "RM 2,205"
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    paymentReminders: true,
    rentalReminders: true,
    maintenanceAlerts: true,
    newBookings: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment_due":
        return <DollarSign className="h-4 w-4" />;
      case "rental_ending":
        return <Calendar className="h-4 w-4" />;
      case "maintenance_due":
        return <Car className="h-4 w-4" />;
      case "new_booking":
        return <User className="h-4 w-4" />;
      case "payment_received":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const dismissNotification = (notificationId: number) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
    toast.success("Notification dismissed");
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast.success("All notifications marked as read");
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with payment reminders and rental alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {unreadCount} unread
          </Badge>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      notification.isRead 
                        ? 'bg-card border-border' 
                        : 'bg-primary/5 border-primary/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                        notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            
                            {/* Additional Details */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {notification.customer && (
                                <Badge variant="outline" className="text-xs">
                                  <User className="h-3 w-3 mr-1" />
                                  {notification.customer}
                                </Badge>
                              )}
                              {notification.car && (
                                <Badge variant="outline" className="text-xs">
                                  <Car className="h-3 w-3 mr-1" />
                                  {notification.car}
                                </Badge>
                              )}
                              {notification.amount && (
                                <Badge variant="outline" className="text-xs">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {notification.amount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Badge 
                              className={getPriorityColor(notification.priority)} 
                              variant="outline"
                            >
                              {notification.priority}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => dismissNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-reminders" className="text-sm">
                    Payment Reminders
                  </Label>
                  <Switch
                    id="payment-reminders"
                    checked={notificationSettings.paymentReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        paymentReminders: checked
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="rental-reminders" className="text-sm">
                    Rental Reminders
                  </Label>
                  <Switch
                    id="rental-reminders"
                    checked={notificationSettings.rentalReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        rentalReminders: checked
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-alerts" className="text-sm">
                    Maintenance Alerts
                  </Label>
                  <Switch
                    id="maintenance-alerts"
                    checked={notificationSettings.maintenanceAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        maintenanceAlerts: checked
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-bookings" className="text-sm">
                    New Bookings
                  </Label>
                  <Switch
                    id="new-bookings"
                    checked={notificationSettings.newBookings}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        newBookings: checked
                      }))
                    }
                  />
                </div>
              </div>
              
              <hr />
              
              <div className="space-y-3">
                <h4 className="font-medium">Delivery Method</h4>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-sm">
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        emailNotifications: checked
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="text-sm">
                    SMS Notifications
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        smsNotifications: checked
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Send Payment Reminders
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Check Upcoming Rentals
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Car className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}