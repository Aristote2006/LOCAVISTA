import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme, Fade, Backdrop, CircularProgress } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children, showSidebar = false, loading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Simulate page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {showSidebar && (
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: showSidebar ? `calc(100% - ${sidebarOpen ? 240 : 0}px)` : '100%' },
            ml: { xs: 0, md: showSidebar && sidebarOpen ? '240px' : 0 },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Navbar toggleSidebar={toggleSidebar} showMenuButton={showSidebar} />

          <Fade in={pageLoaded} timeout={800}>
            <Box
              sx={{
                flexGrow: 1,
                p: { xs: 2, md: 3 },
                backgroundColor: theme.palette.background.default,
                position: 'relative',
                overflowX: 'hidden',
              }}
            >
              {children}
            </Box>
          </Fade>

          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
