import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Switch,
  useTheme,
  alpha,
  Badge,
  Collapse,
  SwipeableDrawer,
  useMediaQuery,
  Backdrop,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocationOn as LocationIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Analytics as AnalyticsIcon,
  Category as CategoryIcon,
  Help as HelpIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useThemeMode } from '../../hooks/useThemeMode';
import { useNotifications } from '../../context/NotificationsContext';
import { useState, useEffect } from 'react';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useThemeMode();
  const { getUnreadCount } = useNotifications();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for expandable menu sections
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Auto-expand the section that contains the current path
  useEffect(() => {
    const currentPath = location.pathname;

    // Check if current path is in activities
    const isInActivities = activityItems.some(item => item.path === currentPath);
    if (isInActivities) setActivitiesOpen(true);

    // Check if current path is in settings
    const isInSettings = settingsItems.some(item => item.path === currentPath);
    if (isInSettings) setSettingsOpen(true);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 900) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleActivities = () => {
    setActivitiesOpen(!activitiesOpen);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleHelp = () => {
    setHelpOpen(!helpOpen);
  };

  // Main menu items
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'Analytics',
      icon: <AnalyticsIcon />,
      path: '/analytics',
    },
  ];

  // Activities submenu items
  const activityItems = [
    {
      text: 'All Activities',
      icon: <LocationIcon />,
      path: '/activities',
    },
    {
      text: 'Add Activity',
      icon: <AddIcon />,
      path: '/activities/add',
    },
    {
      text: 'Categories',
      icon: <CategoryIcon />,
      path: '/categories',
    },
  ];

  // Settings submenu items
  const settingsItems = [
    {
      text: 'Profile',
      icon: <PersonIcon />,
      path: '/profile',
    },
    {
      text: 'Notifications',
      icon: <NotificationsIcon />,
      path: '/notifications',
      badge: getUnreadCount() > 0 ? getUnreadCount() : null,
    },
  ];

  // Drawer content
  const drawerContent = () => (
      {/* Header with logo and close button */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: alpha(theme.palette.primary.main, mode === 'dark' ? 0.15 : 0.05),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component="span"
            sx={{
              color: 'primary.main',
              mr: 0.5,
            }}
          >
            Loca
          </Box>
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Vista
          </Box>
        </Typography>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            display: { xs: 'flex', md: 'none' },
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      {/* User profile section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: alpha(theme.palette.background.default, 0.4),
        }}
      >
        <Avatar
          src={user?.profileImage}
          alt={user?.name || 'Admin'}
          sx={{
            width: 70,
            height: 70,
            mb: 1,
            border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        />
        <Typography variant="subtitle1" fontWeight={600}>
          {user?.name || 'Admin User'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          {user?.email || 'admin@example.com'}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mt: 1,
            width: '100%',
          }}
        >
          <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton
              onClick={toggleColorMode}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              size="small"
              onClick={() => handleNavigation('/notifications')}
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <Badge
                badgeContent={getUnreadCount() > 0 ? getUnreadCount() : null}
                color="error"
                variant={getUnreadCount() > 0 ? "standard" : "dot"}
                invisible={getUnreadCount() === 0}
              >
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton
              onClick={() => handleNavigation('/profile')}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Main menu */}
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <List component="nav" sx={{ px: 1, py: 1 }}>
          <Typography
            variant="overline"
            sx={{
              px: 2,
              py: 1,
              display: 'block',
              color: theme.palette.text.secondary,
              fontWeight: 600,
            }}
          >
            Main
          </Typography>

          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  pl: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Activities section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={toggleActivities}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                pl: 2,
              }}
            >
              <ListItemIcon>
                <LocationIcon />
              </ListItemIcon>
              <ListItemText primary="Activities" />
              {activitiesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={activitiesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {activityItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      pl: 4,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                        minWidth: 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: location.pathname === item.path ? 600 : 500,
                        fontSize: '0.9rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* Settings section */}
          <Typography
            variant="overline"
            sx={{
              px: 2,
              py: 1,
              display: 'block',
              color: theme.palette.text.secondary,
              fontWeight: 600,
              mt: 1,
            }}
          >
            Settings
          </Typography>

          <ListItem disablePadding>
            <ListItemButton
              onClick={toggleSettings}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                pl: 2,
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
              {settingsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {settingsItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      pl: 4,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                        minWidth: 40,
                      }}
                    >
                      {item.badge ? (
                        <Badge
                          badgeContent={item.badge}
                          color="error"
                          sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem' } }}
                        >
                          {item.icon}
                        </Badge>
                      ) : (
                        item.icon
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: location.pathname === item.path ? 600 : 500,
                        fontSize: '0.9rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* Help section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={toggleHelp}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                pl: 2,
              }}
            >
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help & Support" />
              {helpOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={helpOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    pl: 4,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Documentation"
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    pl: 4,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="FAQ"
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>

      {/* Logout button */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: alpha(theme.palette.background.default, 0.4),
        }}
      >
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.2),
            }
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.error.main }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 600,
              color: theme.palette.error.main,
            }}
          />
        </ListItemButton>

        {/* Dark/Light mode toggle */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {mode === 'light' ? 'Light' : 'Dark'} Mode
          </Typography>
          <Switch
            checked={mode === 'dark'}
            onChange={toggleColorMode}
            color="primary"
            size="small"
          />
        </Box>
      </Box>
  );

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && open && (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer - 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          open={open}
          onClick={onClose}
        />
      )}

      {isMobile ? (
        // Mobile drawer (swipeable)
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={onClose}
          onOpen={() => {}}
          disableBackdropTransition={!mode === 'dark'}
          disableDiscovery={mode === 'dark'}
          swipeAreaWidth={30}
          hysteresis={0.3}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: '0 0 20px rgba(0,0,0,0.15)',
            },
          }}
        >
          {drawerContent()}
        </SwipeableDrawer>
      ) : (
        // Desktop drawer (persistent)
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {drawerContent()}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
