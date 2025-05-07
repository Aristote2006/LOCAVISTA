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
const miniDrawerWidth = 65;

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useThemeMode();
  const { getUnreadCount } = useNotifications();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [miniVariant, setMiniVariant] = useState(isTablet);

  // State for expandable menu sections
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Handle responsive drawer width
  const getDrawerWidth = () => {
    if (isMobile) return drawerWidth;
    if (miniVariant) return miniDrawerWidth;
    return drawerWidth;
  };

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

  // Effect to handle responsive behavior
  useEffect(() => {
    setMiniVariant(isTablet);
  }, [isTablet]);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const toggleMiniVariant = () => {
    setMiniVariant(!miniVariant);
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
    <>
      {/* Header with logo and close button */}
      <Box
        sx={{
          p: miniVariant ? 1 : 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: alpha(theme.palette.primary.main, mode === 'dark' ? 0.15 : 0.05),
          minHeight: '64px',
        }}
      >
        {!miniVariant && (
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
        )}

        {miniVariant && (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              }}
            >
              <DashboardIcon />
            </Avatar>
          </Box>
        )}

        {isMobile ? (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        ) : !miniVariant ? (
          <IconButton
            onClick={toggleMiniVariant}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={toggleMiniVariant}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
              position: 'absolute',
              right: -12,
              top: 20,
              zIndex: 1,
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <MenuIcon sx={{ fontSize: 14 }} />
          </IconButton>
        )}
      </Box>

      {/* User profile section */}
      {!miniVariant ? (
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
              width: isMobile ? 50 : 70,
              height: isMobile ? 50 : 70,
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
      ) : (
        <Box
          sx={{
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            backgroundColor: alpha(theme.palette.background.default, 0.4),
          }}
        >
          <Tooltip title={user?.name || 'Admin User'} placement="right">
            <Avatar
              src={user?.profileImage}
              alt={user?.name || 'Admin'}
              sx={{
                width: 40,
                height: 40,
                mb: 1,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />
          </Tooltip>

          <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} placement="right">
            <IconButton
              onClick={toggleColorMode}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                },
                mb: 1,
                width: 30,
                height: 30,
              }}
            >
              {mode === 'dark' ? <LightModeIcon sx={{ fontSize: 16 }} /> : <DarkModeIcon sx={{ fontSize: 16 }} />}
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Main menu */}
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <List component="nav" sx={{ px: miniVariant ? 0.5 : 1, py: 1 }}>
          {!miniVariant && (
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
          )}

          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Tooltip title={miniVariant ? item.text : ""} placement="right">
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    pl: miniVariant ? 1 : 2,
                    py: miniVariant ? 1.5 : 1,
                    justifyContent: miniVariant ? 'center' : 'flex-start',
                    minHeight: miniVariant ? 48 : 'auto',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                      minWidth: miniVariant ? 0 : 40,
                      mr: miniVariant ? 0 : 2,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!miniVariant && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: location.pathname === item.path ? 600 : 500,
                        fontSize: isMobile ? '0.875rem' : '1rem',
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}

          {/* Activities section */}
          <ListItem disablePadding>
            <Tooltip title={miniVariant ? "Activities" : ""} placement="right">
              <ListItemButton
                onClick={toggleActivities}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  pl: miniVariant ? 1 : 2,
                  py: miniVariant ? 1.5 : 1,
                  justifyContent: miniVariant ? 'center' : 'flex-start',
                  minHeight: miniVariant ? 48 : 'auto',
                }}
              >
                <ListItemIcon sx={{
                  minWidth: miniVariant ? 0 : 40,
                  mr: miniVariant ? 0 : 2,
                  justifyContent: 'center',
                }}>
                  <LocationIcon />
                </ListItemIcon>
                {!miniVariant && (
                  <>
                    <ListItemText
                      primary="Activities"
                      primaryTypographyProps={{
                        fontSize: isMobile ? '0.875rem' : '1rem',
                      }}
                    />
                    {activitiesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </>
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {(!miniVariant || (miniVariant && activitiesOpen)) && (
            <Collapse in={activitiesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {activityItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <Tooltip title={miniVariant ? item.text : ""} placement="right">
                      <ListItemButton
                        selected={location.pathname === item.path}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                          borderRadius: 2,
                          mb: 0.5,
                          pl: miniVariant ? 1 : 4,
                          py: miniVariant ? 1.5 : 1,
                          justifyContent: miniVariant ? 'center' : 'flex-start',
                          minHeight: miniVariant ? 40 : 'auto',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                            minWidth: miniVariant ? 0 : 40,
                            mr: miniVariant ? 0 : 2,
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {!miniVariant && (
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                              fontWeight: location.pathname === item.path ? 600 : 500,
                              fontSize: '0.9rem',
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}

          {/* Settings section */}
          {!miniVariant && (
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
          )}

          <ListItem disablePadding>
            <Tooltip title={miniVariant ? "Settings" : ""} placement="right">
              <ListItemButton
                onClick={toggleSettings}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  pl: miniVariant ? 1 : 2,
                  py: miniVariant ? 1.5 : 1,
                  justifyContent: miniVariant ? 'center' : 'flex-start',
                  minHeight: miniVariant ? 48 : 'auto',
                  mt: miniVariant ? 1 : 0,
                }}
              >
                <ListItemIcon sx={{
                  minWidth: miniVariant ? 0 : 40,
                  mr: miniVariant ? 0 : 2,
                  justifyContent: 'center',
                }}>
                  <SettingsIcon />
                </ListItemIcon>
                {!miniVariant && (
                  <>
                    <ListItemText
                      primary="Settings"
                      primaryTypographyProps={{
                        fontSize: isMobile ? '0.875rem' : '1rem',
                      }}
                    />
                    {settingsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </>
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {(!miniVariant || (miniVariant && settingsOpen)) && (
            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {settingsItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <Tooltip title={miniVariant ? item.text : ""} placement="right">
                      <ListItemButton
                        selected={location.pathname === item.path}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                          borderRadius: 2,
                          mb: 0.5,
                          pl: miniVariant ? 1 : 4,
                          py: miniVariant ? 1.5 : 1,
                          justifyContent: miniVariant ? 'center' : 'flex-start',
                          minHeight: miniVariant ? 40 : 'auto',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                            minWidth: miniVariant ? 0 : 40,
                            mr: miniVariant ? 0 : 2,
                            justifyContent: 'center',
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
                        {!miniVariant && (
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                              fontWeight: location.pathname === item.path ? 600 : 500,
                              fontSize: '0.9rem',
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}

          {/* Help section */}
          <ListItem disablePadding>
            <Tooltip title={miniVariant ? "Help & Support" : ""} placement="right">
              <ListItemButton
                onClick={toggleHelp}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  pl: miniVariant ? 1 : 2,
                  py: miniVariant ? 1.5 : 1,
                  justifyContent: miniVariant ? 'center' : 'flex-start',
                  minHeight: miniVariant ? 48 : 'auto',
                }}
              >
                <ListItemIcon sx={{
                  minWidth: miniVariant ? 0 : 40,
                  mr: miniVariant ? 0 : 2,
                  justifyContent: 'center',
                }}>
                  <HelpIcon />
                </ListItemIcon>
                {!miniVariant && (
                  <>
                    <ListItemText
                      primary="Help & Support"
                      primaryTypographyProps={{
                        fontSize: isMobile ? '0.875rem' : '1rem',
                      }}
                    />
                    {helpOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </>
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {(!miniVariant || (miniVariant && helpOpen)) && (
            <Collapse in={helpOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <Tooltip title={miniVariant ? "Documentation" : ""} placement="right">
                    <ListItemButton
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        pl: miniVariant ? 1 : 4,
                        py: miniVariant ? 1.5 : 1,
                        justifyContent: miniVariant ? 'center' : 'flex-start',
                        minHeight: miniVariant ? 40 : 'auto',
                      }}
                    >
                      <ListItemIcon sx={{
                        minWidth: miniVariant ? 0 : 40,
                        mr: miniVariant ? 0 : 2,
                        justifyContent: 'center',
                      }}>
                        <HelpIcon />
                      </ListItemIcon>
                      {!miniVariant && (
                        <ListItemText
                          primary="Documentation"
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                <ListItem disablePadding>
                  <Tooltip title={miniVariant ? "FAQ" : ""} placement="right">
                    <ListItemButton
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        pl: miniVariant ? 1 : 4,
                        py: miniVariant ? 1.5 : 1,
                        justifyContent: miniVariant ? 'center' : 'flex-start',
                        minHeight: miniVariant ? 40 : 'auto',
                      }}
                    >
                      <ListItemIcon sx={{
                        minWidth: miniVariant ? 0 : 40,
                        mr: miniVariant ? 0 : 2,
                        justifyContent: 'center',
                      }}>
                        <HelpIcon />
                      </ListItemIcon>
                      {!miniVariant && (
                        <ListItemText
                          primary="FAQ"
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              </List>
            </Collapse>
          )}
        </List>
      </Box>

      {/* Logout button */}
      <Box
        sx={{
          p: miniVariant ? 1 : 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: alpha(theme.palette.background.default, 0.4),
        }}
      >
        <Tooltip title={miniVariant ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.2),
              },
              justifyContent: miniVariant ? 'center' : 'flex-start',
              py: miniVariant ? 1.5 : 1,
            }}
          >
            <ListItemIcon sx={{
              color: theme.palette.error.main,
              minWidth: miniVariant ? 0 : 40,
              mr: miniVariant ? 0 : 2,
              justifyContent: 'center',
            }}>
              <LogoutIcon />
            </ListItemIcon>
            {!miniVariant && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: theme.palette.error.main,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>

        {/* Dark/Light mode toggle - only show in full width mode */}
        {!miniVariant && (
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
        )}
      </Box>
    </>
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
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent()}
        </SwipeableDrawer>
      ) : (
        // Desktop drawer (persistent)
        <Drawer
          sx={{
            width: getDrawerWidth(),
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: getDrawerWidth(),
              boxSizing: 'border-box',
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
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
