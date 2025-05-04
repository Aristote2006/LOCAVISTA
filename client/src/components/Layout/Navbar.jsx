import { useState, useEffect } from 'react';
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
  Link,
  Badge,
  Chip,
  useScrollTrigger,
  Slide,
  Container,
  Divider,
  useTheme,
  alpha,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccountCircle,
  Logout,
  Explore as ExploreIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

// Hide navbar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ toggleSidebar, showMenuButton = false }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if current route is active
  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate notifications (in a real app, this would come from a backend)
  useEffect(() => {
    if (user) {
      setHasNotifications(true);
    }
  }, [user]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
    setHasNotifications(false); // Mark as read
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Create navigation links based on user role
  const getNavLinks = () => {
    const baseLinks = [
      { text: 'Home', path: '/', icon: <HomeIcon /> },
      { text: 'Explore', path: '/explore', icon: <ExploreIcon /> },
      { text: 'About', path: '/about', icon: <InfoIcon /> },
      { text: 'Contact', path: '/contact', icon: <ContactIcon /> },
    ];

    // Add dashboard link for admin users
    if (user && user.role === 'admin') {
      baseLinks.push({
        text: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
        highlight: true
      });
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="sticky"
          color={isScrolled ? "primary" : "transparent"}
          elevation={isScrolled ? 4 : 0}
          sx={{
            transition: 'all 0.3s ease',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            backgroundColor: isScrolled
              ? alpha(theme.palette.primary.main, 0.95)
              : 'transparent',
            color: isScrolled ? 'white' : 'inherit',
            borderBottom: isScrolled
              ? 'none'
              : '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ py: 1 }}>
              {showMenuButton && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleSidebar}
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Mobile menu button */}
              <IconButton
                color="inherit"
                aria-label="open mobile menu"
                edge="start"
                onClick={toggleMobileMenu}
                sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Typography
                variant="h5"
                component={RouterLink}
                to="/"
                sx={{
                  flexGrow: { xs: 1, md: 0 },
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  mr: 3,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: isScrolled
                      ? 'rgba(255, 255, 255, 0.2)'
                      : alpha(theme.palette.primary.main, 0.1),
                    mr: 1,
                  }}
                >
                  <ExploreIcon
                    sx={{
                      transform: 'rotate(-15deg)',
                      color: isScrolled ? 'white' : theme.palette.primary.main,
                    }}
                  />
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: isScrolled ? 'inherit' : 'primary.main',
                    mr: 0.5,
                    transition: 'color 0.3s ease',
                    fontWeight: 800,
                  }}
                >
                  Loca
                </Box>
                <Box
                  component="span"
                  sx={{
                    background: isScrolled
                      ? 'linear-gradient(90deg, #fff, #e8f5e9)'
                      : 'linear-gradient(90deg, #2E7D32, #4CAF50)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                  }}
                >
                  Vista
                </Box>
              </Typography>

              {/* Navigation links - desktop */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                    variant={link.highlight ? "contained" : "text"}
                    color={link.highlight ? "secondary" : "inherit"}
                    startIcon={link.highlight ? link.icon : null}
                    sx={{
                      mx: 1,
                      color: link.highlight ? undefined : 'inherit',
                      position: 'relative',
                      fontWeight: 600,
                      borderRadius: link.highlight ? '20px' : 'inherit',
                      px: link.highlight ? 2 : 1,
                      '&::after': !link.highlight && isActive(link.path) ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '25%',
                        width: '50%',
                        height: '3px',
                        backgroundColor: isScrolled ? 'white' : 'primary.main',
                        borderRadius: '3px',
                      } : {},
                      '&:hover': {
                        backgroundColor: link.highlight ? undefined : (isScrolled
                          ? 'rgba(255, 255, 255, 0.1)'
                          : alpha(theme.palette.primary.main, 0.1)),
                      }
                    }}
                  >
                    {link.text}
                  </Button>
                ))}
              </Box>

              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* Notifications */}
                  <Tooltip title="Notifications">
                    <IconButton
                      color="inherit"
                      onClick={handleNotificationsOpen}
                      size="large"
                      sx={{
                        mr: 1,
                        backgroundColor: isScrolled
                          ? 'rgba(255, 255, 255, 0.1)'
                          : alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                          backgroundColor: isScrolled
                            ? 'rgba(255, 255, 255, 0.2)'
                            : alpha(theme.palette.primary.main, 0.2),
                        }
                      }}
                    >
                      <Badge color="error" variant="dot" invisible={!hasNotifications}>
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={notificationsAnchorEl}
                    open={Boolean(notificationsAnchorEl)}
                    onClose={handleNotificationsClose}
                    slotProps={{
                      paper: {
                        elevation: 3,
                        sx: {
                          width: 320,
                          maxHeight: 400,
                          mt: 1.5,
                          borderRadius: 2,
                          overflow: 'hidden',
                        }
                      }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Notifications
                      </Typography>
                    </Box>
                    <MenuItem>
                      <Box sx={{ width: '100%', py: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Welcome to LocaVista!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Start exploring local attractions near you.
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem>
                      <Box sx={{ width: '100%', py: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          New attractions added
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          5 new attractions were added in your area.
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Box sx={{ p: 1.5, textAlign: 'center' }}>
                      <Button
                        size="small"
                        color="primary"
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                      >
                        View all notifications
                      </Button>
                    </Box>
                  </Menu>

                  {/* User menu */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {user?.role === 'admin' && (
                      <>
                        <Chip
                          label="Admin"
                          size="small"
                          color="secondary"
                          sx={{ mr: 1, display: { xs: 'none', sm: 'flex' } }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          color="inherit"
                          component={RouterLink}
                          to="/dashboard"
                          startIcon={<DashboardIcon />}
                          sx={{
                            mr: 1,
                            display: { xs: 'none', sm: 'flex' },
                            borderRadius: '20px',
                            borderColor: isScrolled ? 'rgba(255,255,255,0.3)' : 'primary.main',
                            fontSize: '0.75rem',
                            py: 0.5,
                            px: 1,
                            textTransform: 'none'
                          }}
                        >
                          Dashboard
                        </Button>
                      </>
                    )}
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleMenu}
                        size="small"
                        sx={{ ml: 1 }}
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                      >
                        {user.profileImage ? (
                          <Avatar
                            alt={user.name}
                            src={user.profileImage}
                            sx={{
                              width: 40,
                              height: 40,
                              border: '2px solid',
                              borderColor: isScrolled ? 'white' : 'primary.main',
                            }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: 'secondary.main',
                              border: '2px solid',
                              borderColor: isScrolled ? 'white' : 'primary.main',
                            }}
                          >
                            {user?.name ? user.name.charAt(0) : '?'}
                          </Avatar>
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
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
                      <Typography variant="subtitle1" fontWeight={600} noWrap>
                        {user?.name || 'User'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {user?.email || 'No email'}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfile}>
                      <PersonIcon sx={{ mr: 1.5 }} fontSize="small" color="primary" /> Profile
                    </MenuItem>
                    {user?.role === 'admin' && (
                      <MenuItem onClick={() => {
                        handleClose();
                        navigate('/dashboard');
                      }}>
                        <DashboardIcon sx={{ mr: 1.5 }} fontSize="small" color="primary" /> Dashboard
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 1.5 }} fontSize="small" color="error" /> Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    color={isScrolled ? "inherit" : "primary"}
                    startIcon={<LoginIcon />}
                    sx={{
                      mr: 1,
                      borderRadius: '20px',
                      px: 2,
                      display: { xs: 'none', sm: 'flex' },
                      backgroundColor: isScrolled
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: isScrolled
                          ? 'rgba(255, 255, 255, 0.2)'
                          : alpha(theme.palette.primary.main, 0.1),
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color={isScrolled ? "secondary" : "primary"}
                    startIcon={<RegisterIcon />}
                    sx={{
                      borderRadius: '20px',
                      px: { xs: 1.5, sm: 2 },
                      py: 1,
                      boxShadow: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        slotProps={{
          paper: {
            sx: {
              width: '75%',
              maxWidth: 300,
              borderRadius: '0 16px 16px 0',
              backgroundColor: theme.palette.primary.main,
              color: 'white',
            }
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700}>
            LocaVista
          </Typography>
          <IconButton color="inherit" onClick={toggleMobileMenu}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {user && (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {user.profileImage ? (
                <Avatar
                  alt={user.name}
                  src={user.profileImage}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
              ) : (
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  {user?.name ? user.name.charAt(0) : '?'}
                </Avatar>
              )}
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {user?.name || 'User'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {user?.email || 'No email'}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 1 }} />
          </Box>
        )}

        <List>
          {navLinks.map((link) => (
            <ListItem
              key={link.path}
              component={RouterLink}
              to={link.path}
              onClick={toggleMobileMenu}
              sx={{
                py: 1.5,
                backgroundColor: link.highlight
                  ? alpha(theme.palette.secondary.main, 0.2)
                  : (isActive(link.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent'),
                '&:hover': {
                  backgroundColor: link.highlight
                    ? alpha(theme.palette.secondary.main, 0.3)
                    : 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: link.highlight ? theme.palette.secondary.light : 'white',
                  minWidth: 40
                }}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText
                primary={link.text}
                primaryTypographyProps={{
                  fontWeight: link.highlight ? 700 : (isActive(link.path) ? 700 : 400),
                  color: link.highlight ? theme.palette.secondary.light : 'inherit'
                }}
              />
              <ChevronRightIcon sx={{ opacity: 0.5 }} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 1 }} />

        {!user ? (
          <Box sx={{ p: 2 }}>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              fullWidth
              sx={{
                mb: 1,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
              onClick={toggleMobileMenu}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={toggleMobileMenu}
            >
              Register
            </Button>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Button
              component={RouterLink}
              to="/profile"
              variant="outlined"
              fullWidth
              startIcon={<PersonIcon />}
              sx={{
                mb: 1,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
              onClick={toggleMobileMenu}
            >
              Profile
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              startIcon={<Logout />}
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default Navbar;
