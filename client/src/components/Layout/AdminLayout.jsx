import { useState, useEffect } from 'react';
import {
  Box,
  useMediaQuery,
  useTheme,
  Fade,
  Backdrop,
  CircularProgress,
  Paper,
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
  alpha,
  Divider,
  Badge,
  Avatar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
} from '@mui/icons-material';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { useThemeMode } from '../../hooks/useThemeMode';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const miniDrawerWidth = 65;

const AdminLayout = ({ children, loading = false }) => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [miniVariant, setMiniVariant] = useState(isTablet);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Effect to handle responsive behavior
  useEffect(() => {
    setMiniVariant(isTablet);
  }, [isTablet]);

  // Effect to handle mobile sidebar
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get the current drawer width based on state
  const getDrawerWidth = () => {
    if (!sidebarOpen) return 0;
    if (miniVariant) return miniDrawerWidth;
    return drawerWidth;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Format date as "Monday, January 1, 2023"
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time as "10:30 AM"
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* Loading overlay */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(46, 125, 50, 0.3)',
          backdropFilter: 'blur(4px)'
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Main layout */}
      <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
        <Sidebar open={sidebarOpen} onClose={toggleSidebar} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              sm: sidebarOpen ?
                (miniVariant ? `calc(100% - ${miniDrawerWidth}px)` : `calc(100% - ${drawerWidth}px)`)
                : '100%'
            },
            ml: {
              xs: 0,
              sm: sidebarOpen ?
                (miniVariant ? `${miniDrawerWidth}px` : `${drawerWidth}px`)
                : 0
            },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <Fade in={pageLoaded} timeout={800}>
            <Box
              sx={{
                flexGrow: 1,
                p: { xs: 1.5, sm: 2, md: 3 },
                backgroundColor: theme.palette.background.default,
                position: 'relative',
                overflowX: 'hidden',
              }}
            >
              {children}
            </Box>
          </Fade>

          {/* Admin Footer with Quick Actions - Hidden on mobile */}
          {!isMobile && (
            <Paper
              elevation={3}
              sx={{
                p: { xs: 1, sm: 2 },
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backgroundColor: theme.palette.background.paper,
                backgroundImage: theme.palette.mode === 'dark'
                  ? 'linear-gradient(rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.9)), url("https://www.transparenttextures.com/patterns/cubes.png")'
                  : 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://www.transparenttextures.com/patterns/cubes.png")',
                zIndex: 10,
              }}
            >
              <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
                {/* Date and Time - Hidden on extra small screens */}
                <Grid item xs={12} sm={4} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 2 }}>
                      <CalendarIcon color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {formattedDate}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
                        <ClockIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                        {formattedTime}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12} sm={8} md={6}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: { xs: 0.5, sm: 1 },
                    flexWrap: { xs: 'wrap', sm: 'nowrap' }
                  }}>
                    <Tooltip title="Refresh Dashboard">
                      <IconButton
                        onClick={handleRefresh}
                        size={isTablet ? "small" : "medium"}
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          }
                        }}
                      >
                        <RefreshIcon
                          fontSize={isTablet ? "small" : "medium"}
                          sx={{
                            animation: refreshing ? 'spin 1s linear infinite' : 'none',
                            '@keyframes spin': {
                              '0%': {
                                transform: 'rotate(0deg)',
                              },
                              '100%': {
                                transform: 'rotate(360deg)',
                              },
                            },
                          }}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Search">
                      <IconButton
                        size={isTablet ? "small" : "medium"}
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          }
                        }}
                      >
                        <SearchIcon fontSize={isTablet ? "small" : "medium"} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Notifications">
                      <IconButton
                        size={isTablet ? "small" : "medium"}
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          }
                        }}
                      >
                        <Badge badgeContent={3} color="error">
                          <NotificationsIcon fontSize={isTablet ? "small" : "medium"} />
                        </Badge>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Settings">
                      <IconButton
                        onClick={() => navigate('/profile')}
                        size={isTablet ? "small" : "medium"}
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          }
                        }}
                      >
                        <SettingsIcon fontSize={isTablet ? "small" : "medium"} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Help">
                      <IconButton
                        size={isTablet ? "small" : "medium"}
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          }
                        }}
                      >
                        <HelpIcon fontSize={isTablet ? "small" : "medium"} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                      <IconButton
                        onClick={toggleColorMode}
                        size={isTablet ? "small" : "medium"}
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          }
                        }}
                      >
                        {mode === 'dark' ?
                          <LightModeIcon fontSize={isTablet ? "small" : "medium"} /> :
                          <DarkModeIcon fontSize={isTablet ? "small" : "medium"} />
                        }
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>

                {/* User Info and Logout */}
                <Grid item xs={12} sm={12} md={3}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-end' },
                    alignItems: 'center',
                    mt: { xs: 1, sm: 0 }
                  }}>
                    <Box sx={{ mr: 2 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {user?.name || 'Admin User'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user?.role === 'admin' ? 'Administrator' : 'User'}
                      </Typography>
                    </Box>

                    <Avatar
                      src={user?.profileImage}
                      alt={user?.name || 'Admin'}
                      sx={{
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        mr: 1,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      }}
                    />

                    <Button
                      variant="outlined"
                      color="error"
                      size={isTablet ? "small" : "medium"}
                      startIcon={<LogoutIcon />}
                      onClick={handleLogout}
                      sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      {isTablet ? 'Exit' : 'Logout'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
