import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const NotificationsContext = createContext();

// Sample notifications data
const initialNotifications = [
  { 
    id: 1, 
    title: 'New User Registration', 
    message: 'John Doe just registered', 
    time: '5 minutes ago', 
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: 'user',
    read: false 
  },
  { 
    id: 2, 
    title: 'New Activity Added', 
    message: 'Central Park Museum was added', 
    time: '1 hour ago', 
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    type: 'activity',
    read: false 
  },
  { 
    id: 3, 
    title: 'System Update', 
    message: 'System will be updated tonight', 
    time: '3 hours ago', 
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    type: 'system',
    read: true 
  },
  { 
    id: 4, 
    title: 'New Booking Request', 
    message: 'You have a new booking request for Central Park Tour', 
    time: '1 day ago', 
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: 'booking',
    read: true 
  },
  { 
    id: 5, 
    title: 'Activity Updated', 
    message: 'Times Square Tour was updated', 
    time: '2 days ago', 
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'activity',
    read: true 
  },
];

// Provider component
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    // Try to get notifications from localStorage
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : initialNotifications;
  });

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification.id;
  };

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Get unread count
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  // Format the time for display
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  // Update notification times
  const updateNotificationTimes = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        time: formatTime(notification.timestamp)
      }))
    );
  };

  // Update notification times every minute
  useEffect(() => {
    updateNotificationTimes();
    const interval = setInterval(updateNotificationTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearNotifications,
        getUnreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

// Custom hook to use the notifications context
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
