import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  IconButton,
  Button,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  alpha,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Badge,
  Tab,
  Tabs,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Settings as SettingsIcon,
  Announcement as AnnouncementIcon,
  BookOnline as BookingIcon,
  MarkEmailRead as MarkReadIcon,
  DeleteSweep as DeleteAllIcon,
} from '@mui/icons-material';
import AdminLayout from '../components/Layout/AdminLayout';
import { useNotifications } from '../context/NotificationsContext';
import { toast } from 'react-toastify';

const NotificationsPage = () => {
  const theme = useTheme();
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    getUnreadCount
  } = useNotifications();

  const [activeTab, setActiveTab] = useState('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Open filter menu
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  // Close filter menu
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Open action menu for a notification
  const handleActionClick = (event, notification) => {
    event.stopPropagation();
    setSelectedNotification(notification);
    setActionAnchorEl(event.currentTarget);
  };

  // Close action menu
  const handleActionClose = () => {
    setActionAnchorEl(null);
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
      setSnackbarMessage('Notification marked as read');
      setSnackbarOpen(true);
    }
    setSelectedNotification(notification);
  };

  // Handle mark as read
  const handleMarkAsRead = () => {
    if (selectedNotification) {
      markAsRead(selectedNotification.id);
      setSnackbarMessage('Notification marked as read');
      setSnackbarOpen(true);
    }
    handleActionClose();
  };

  // Handle delete notification
  const handleDeleteNotification = () => {
    if (selectedNotification) {
      removeNotification(selectedNotification.id);
      setSnackbarMessage('Notification deleted');
      setSnackbarOpen(true);
    }
    handleActionClose();
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setSnackbarMessage('All notifications marked as read');
    setSnackbarOpen(true);
  };

  // Handle clear all notifications
  const handleClearAll = () => {
    clearNotifications();
    setSnackbarMessage('All notifications cleared');
    setSnackbarOpen(true);
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'user':
        return <PersonIcon color="primary" />;
      case 'activity':
        return <LocationIcon color="secondary" />;
      case 'system':
        return <AnnouncementIcon color="info" />;
      case 'booking':
        return <BookingIcon color="success" />;
      default:
        return <NotificationsIcon color="primary" />;
    }
  };

  // Get notification avatar color based on type
  const getAvatarColor = (type) => {
    switch (type) {
      case 'user':
        return theme.palette.primary.main;
      case 'activity':
        return theme.palette.secondary.main;
      case 'system':
        return theme.palette.info.main;
      case 'booking':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your notifications and stay updated with the latest activities
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Badge
                    badgeContent={getUnreadCount()}
                    color="error"
                    sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem' } }}
                  >
                    <NotificationsIcon color="primary" />
                  </Badge>
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    Notifications
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={activeTab === 'all'}
                      onClick={() => setActiveTab('all')}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemText primary="All Notifications" />
                      <Chip
                        label={notifications.length}
                        size="small"
                        color={activeTab === 'all' ? 'primary' : 'default'}
                        sx={{ height: 20 }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={activeTab === 'unread'}
                      onClick={() => setActiveTab('unread')}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemText primary="Unread" />
                      <Chip
                        label={getUnreadCount()}
                        size="small"
                        color={activeTab === 'unread' ? 'primary' : 'error'}
                        sx={{ height: 20 }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ my: 1 }} />
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={activeTab === 'user'}
                      onClick={() => setActiveTab('user')}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <PersonIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Users" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={activeTab === 'activity'}
                      onClick={() => setActiveTab('activity')}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <LocationIcon color="secondary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Activities" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={activeTab === 'system'}
                      onClick={() => setActiveTab('system')}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <AnnouncementIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="System" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={activeTab === 'booking'}
                      onClick={() => setActiveTab('booking')}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <BookingIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Bookings" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Actions
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleMarkAllAsRead} sx={{ borderRadius: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <MarkReadIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Mark All as Read" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClearAll} sx={{ borderRadius: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <DeleteAllIcon color="error" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Clear All" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Main content */}
          <Grid item xs={12} md={9}>
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {/* Header with tabs and actions */}
              <Box sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backgroundColor: alpha(theme.palette.background.default, 0.4),
              }}>
                <Typography variant="h6">
                  {activeTab === 'all' && 'All Notifications'}
                  {activeTab === 'unread' && 'Unread Notifications'}
                  {activeTab === 'user' && 'User Notifications'}
                  {activeTab === 'activity' && 'Activity Notifications'}
                  {activeTab === 'system' && 'System Notifications'}
                  {activeTab === 'booking' && 'Booking Notifications'}
                </Typography>
                <Box>
                  <Tooltip title="Refresh">
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Filter">
                    <IconButton size="small" onClick={handleFilterClick}>
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={filterAnchorEl}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleFilterClose}
                    slotProps={{
                      paper: {
                        elevation: 3,
                        sx: {
                          mt: 1.5,
                          width: 180,
                          borderRadius: 2,
                        }
                      }
                    }}
                  >
                    <MenuItem onClick={() => { setActiveTab('all'); handleFilterClose(); }}>
                      All Notifications
                    </MenuItem>
                    <MenuItem onClick={() => { setActiveTab('unread'); handleFilterClose(); }}>
                      Unread Only
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { setActiveTab('user'); handleFilterClose(); }}>
                      Users
                    </MenuItem>
                    <MenuItem onClick={() => { setActiveTab('activity'); handleFilterClose(); }}>
                      Activities
                    </MenuItem>
                    <MenuItem onClick={() => { setActiveTab('system'); handleFilterClose(); }}>
                      System
                    </MenuItem>
                    <MenuItem onClick={() => { setActiveTab('booking'); handleFilterClose(); }}>
                      Bookings
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>

              {/* Notifications list */}
              {filteredNotifications.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {filteredNotifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                      <ListItem
                        disablePadding
                        sx={{
                          backgroundColor: notification.read
                            ? 'transparent'
                            : alpha(theme.palette.primary.main, 0.05),
                        }}
                      >
                        <ListItemButton
                          onClick={() => handleNotificationClick(notification)}
                          sx={{ px: 2, py: 1.5 }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Avatar
                              sx={{
                                width: 36,
                                height: 36,
                                bgcolor: getAvatarColor(notification.type),
                              }}
                            >
                              {getNotificationIcon(notification.type)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="subtitle2" fontWeight={notification.read ? 500 : 600}>
                                  {notification.title}
                                </Typography>
                                {!notification.read && (
                                  <Box
                                    sx={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: '50%',
                                      backgroundColor: theme.palette.primary.main,
                                    }}
                                  />
                                )}
                              </Box>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  {notification.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {notification.time}
                                </Typography>
                              </>
                            }
                          />
                          <IconButton
                            edge="end"
                            onClick={(e) => handleActionClick(e, notification)}
                            sx={{ ml: 1 }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </ListItemButton>
                      </ListItem>
                      {index < filteredNotifications.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No notifications found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activeTab === 'all'
                      ? "You don't have any notifications yet"
                      : `You don't have any ${activeTab} notifications`}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Action menu for individual notifications */}
        <Menu
          anchorEl={actionAnchorEl}
          open={Boolean(actionAnchorEl)}
          onClose={handleActionClose}
          slotProps={{
            paper: {
              elevation: 3,
              sx: {
                mt: 1.5,
                width: 180,
                borderRadius: 2,
              }
            }
          }}
        >
          {selectedNotification && !selectedNotification.read && (
            <MenuItem onClick={handleMarkAsRead}>
              <ListItemIcon>
                <CheckCircleIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText>Mark as Read</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={handleDeleteNotification}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </AdminLayout>
  );
};

export default NotificationsPage;
