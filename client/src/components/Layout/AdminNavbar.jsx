import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
  Badge,
  Chip,
  useTheme,
  alpha,
  InputBase,
  Divider,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  NotificationsActive as NotificationsActiveIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useThemeMode } from '../../hooks/useThemeMode';
import { useNotifications } from '../../context/NotificationsContext';

const AdminNavbar = ({ toggleSidebar }) => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { notifications, markAsRead, getUnreadCount } = useNotifications();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [quickActionsAnchorEl, setQuickActionsAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleViewAllNotifications = () => {
    handleNotificationsClose();
    navigate('/notifications');
  };

  const handleNotificationClick = (event, notificationId) => {
    event.stopPropagation();
    markAsRead(notificationId);
  };

  const handleQuickActionsOpen = (event) => {
    setQuickActionsAnchorEl(event.currentTarget);
  };

  const handleQuickActionsClose = () => {
    setQuickActionsAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.9)
          : alpha(theme.palette.background.paper, 0.9),
        color: theme.palette.text.primary,
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backgroundImage: theme.palette.mode === 'dark'
          ? 'linear-gradient(rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.8)), url("https://www.transparenttextures.com/patterns/cubes.png")'
          : 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("https://www.transparenttextures.com/patterns/cubes.png")',
      }}
    >
      <Toolbar sx={{
        justifyContent: 'space-between',
        minHeight: { xs: 56, sm: 64 },
        px: { xs: 1, sm: 2 }
      }}>
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/dashboard"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                mr: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  mr: 1,
                }}
              >
                <DashboardIcon
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>
              <Box
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  mr: 0.5,
                  fontWeight: 800,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Admin
              </Box>
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Dashboard
              </Box>
            </Typography>

            <Chip
              label={`v1.0`}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.625rem',
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                display: { xs: 'none', md: 'flex' }
              }}
            />
          </Box>

          {/* Quick navigation buttons */}
          <Box sx={{ ml: 3, display: { xs: 'none', lg: 'flex' }, gap: 1 }}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                px: 2,
                py: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              View Site
            </Button>

            <Button
              component={RouterLink}
              to="/activities/add"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                px: 2,
                py: 1,
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                }
              }}
            >
              Add Activity
            </Button>
          </Box>
        </Box>

        {/* Center section - Search */}
        <Box
          sx={{
            display: { xs: searchOpen ? 'flex' : 'none', md: 'flex' },
            position: { xs: 'absolute', md: 'static' },
            left: searchOpen ? 0 : 'auto',
            right: searchOpen ? 0 : 'auto',
            top: searchOpen ? 0 : 'auto',
            bottom: searchOpen ? 0 : 'auto',
            width: searchOpen ? '100%' : 'auto',
            zIndex: searchOpen ? 1200 : 'auto',
            backgroundColor: searchOpen ? theme.palette.background.paper : 'transparent',
            p: searchOpen ? 1 : 0,
            flexGrow: { md: 1 },
            justifyContent: { md: 'center' },
          }}
        >
          {searchOpen && (
            <IconButton
              onClick={toggleSearch}
              sx={{ mr: 1 }}
            >
              <CloseIcon />
            </IconButton>
          )}

          <Paper
            component="form"
            sx={{
              p: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              width: { xs: '100%', md: 300, lg: 400 },
              maxWidth: { md: '50vw' },
              borderRadius: '8px',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              backgroundColor: alpha(theme.palette.background.default, 0.5),
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search activities, users..."
              inputProps={{ 'aria-label': 'search activities' }}
            />
          </Paper>
        </Box>

        {/* Right section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Search toggle for mobile */}
          <IconButton
            color="inherit"
            onClick={toggleSearch}
            sx={{ display: { xs: searchOpen ? 'none' : 'flex', md: 'none' } }}
          >
            <SearchIcon />
          </IconButton>

          {/* Quick Actions */}
          <Tooltip title="Quick Actions">
            <IconButton
              color="inherit"
              onClick={handleQuickActionsOpen}
              size={isMobile ? "small" : "medium"}
              sx={{ ml: { xs: 0.5, sm: 1 } }}
            >
              <MoreVertIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={quickActionsAnchorEl}
            open={Boolean(quickActionsAnchorEl)}
            onClose={handleQuickActionsClose}
            slotProps={{
              paper: {
                elevation: 3,
                sx: {
                  mt: 1.5,
                  width: { xs: 180, sm: 200 },
                  borderRadius: 2,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                }
              }
            }}
          >
            <MenuItem onClick={() => {
              handleQuickActionsClose();
              navigate('/activities/add');
            }}>
              <ListItemIcon>
                <AddIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Add Activity" primaryTypographyProps={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
            </MenuItem>
            <MenuItem onClick={() => {
              handleQuickActionsClose();
              navigate('/activities');
            }}>
              <ListItemIcon>
                <LocationIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Manage Activities" primaryTypographyProps={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
            </MenuItem>
            <MenuItem onClick={() => {
              handleQuickActionsClose();
              navigate('/profile');
            }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
            </MenuItem>
            <Divider />
            <MenuItem onClick={toggleColorMode}>
              <ListItemIcon>
                {mode === 'dark' ? (
                  <LightModeIcon fontSize="small" color="primary" />
                ) : (
                  <DarkModeIcon fontSize="small" color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} primaryTypographyProps={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
            </MenuItem>
          </Menu>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationsOpen}
              size={isMobile ? "small" : "medium"}
              sx={{ ml: { xs: 0.5, sm: 1 } }}
            >
              <Badge
                badgeContent={getUnreadCount()}
                color="error"
                sx={{ '& .MuiBadge-badge': { fontSize: isMobile ? '0.6rem' : '0.75rem' } }}
              >
                {getUnreadCount() > 0 ? (
                  <NotificationsActiveIcon fontSize={isMobile ? "small" : "medium"} />
                ) : (
                  <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
                )}
              </Badge>
            </IconButton>
          </Tooltip>
          <Popover
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            slotProps={{
              paper: {
                elevation: 3,
                sx: {
                  width: { xs: 280, sm: 320 },
                  maxHeight: { xs: 350, sm: 400 },
                  mt: 1.5,
                  borderRadius: 2,
                  overflow: 'hidden',
                }
              }
            }}
          >
            <Box sx={{
              p: 2,
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Notifications
              </Typography>
              {getUnreadCount() > 0 && (
                <Chip
                  label={`${getUnreadCount()} new`}
                  size="small"
                  color="error"
                  sx={{ height: 20 }}
                />
              )}
            </Box>
            <List sx={{ p: 0 }}>
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                  <ListItem
                    key={notification.id}
                    disablePadding
                    sx={{
                      backgroundColor: notification.read
                        ? 'transparent'
                        : alpha(theme.palette.primary.main, 0.05),
                    }}
                  >
                    <ListItemButton
                      sx={{ px: 2, py: 1.5 }}
                      onClick={(e) => handleNotificationClick(e, notification.id)}
                    >
                      <Box sx={{ width: '100%' }}>
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
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          {notification.time}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <ListItem sx={{ py: 4, textAlign: 'center' }}>
                  <ListItemText
                    primary="No notifications"
                    secondary="You're all caught up!"
                    primaryTypographyProps={{ align: 'center' }}
                    secondaryTypographyProps={{ align: 'center' }}
                  />
                </ListItem>
              )}
            </List>
            <Divider />
            <Box sx={{ p: 1.5, textAlign: 'center' }}>
              <Button
                size="small"
                color="primary"
                sx={{ borderRadius: 2, textTransform: 'none' }}
                onClick={handleViewAllNotifications}
                startIcon={<NotificationsIcon fontSize="small" />}
              >
                View all notifications
              </Button>
            </Box>
          </Popover>

          {/* User menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <Button
              onClick={handleMenu}
              color="inherit"
              size={isMobile ? "small" : "medium"}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 }
              }}
            >
              <Avatar
                alt={user?.name || 'Admin'}
                src={user?.profileImage}
                sx={{
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                  mr: { xs: 0, sm: 1 },
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              />
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" fontWeight={600} align="left">
                  {user?.name || 'Admin'}
                </Typography>
                <Typography variant="caption" color="text.secondary" align="left" display="block">
                  {user?.role === 'admin' ? 'Administrator' : 'User'}
                </Typography>
              </Box>
              <ArrowDropDownIcon sx={{ ml: { xs: 0, md: 0.5 }, fontSize: { xs: 20, sm: 24 } }} />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              slotProps={{
                paper: {
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    overflow: 'visible',
                    borderRadius: 2,
                    width: { xs: 200, sm: 220 },
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  }
                }
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" fontWeight={600} noWrap fontSize={isMobile ? '0.9rem' : '1rem'}>
                  {user?.name || 'Admin User'}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap fontSize={isMobile ? '0.75rem' : '0.875rem'}>
                  {user?.email || 'admin@example.com'}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleProfile} dense={isMobile}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose();
                navigate('/dashboard');
              }} dense={isMobile}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose();
                navigate('/profile');
              }} dense={isMobile}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} dense={isMobile}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    color: theme.palette.error.main
                  }}
                />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
