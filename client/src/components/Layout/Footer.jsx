import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  IconButton, 
  Divider, 
  TextField, 
  Button, 
  Paper,
  useTheme,
  alpha,
  InputAdornment
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn, 
  GitHub, 
  Send as SendIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        pt: 8,
        pb: 4,
        mt: 'auto',
        color: 'white',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.05,
          zIndex: -1,
        }
      }}
    >
      {/* Wave shape at the top */}
      <Box
        sx={{
          position: 'absolute',
          top: -2,
          left: 0,
          width: '100%',
          height: '80px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'rotate(180deg)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h4" 
                component={RouterLink} 
                to="/" 
                sx={{ 
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    mr: 1,
                  }}
                >
                  <Box 
                    component="img" 
                    src="https://img.icons8.com/fluency/48/compass.png"
                    alt="LocaVista Logo"
                    sx={{ width: 24, height: 24 }}
                  />
                </Box>
                <Box component="span" sx={{ mr: 0.5 }}>
                  Loca
                </Box>
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(90deg, #fff, #e8f5e9)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Vista
                </Box>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.7 }}>
              Discover amazing local attractions and hidden gems near you. 
              LocaVista helps you find the best places to visit, eat, and stay.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    transform: 'translateY(-3px)',
                  }
                }}
                aria-label="Facebook"
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    transform: 'translateY(-3px)',
                  }
                }}
                aria-label="Twitter"
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    transform: 'translateY(-3px)',
                  }
                }}
                aria-label="Instagram"
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    transform: 'translateY(-3px)',
                  }
                }}
                aria-label="LinkedIn"
              >
                <LinkedIn fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                position: 'relative',
                display: 'inline-block',
                mb: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 2
                }
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { text: 'Home', path: '/' },
                { text: 'Explore', path: '/explore' },
                { text: 'About Us', path: '/about' },
                { text: 'Contact', path: '/contact' },
                { text: 'Privacy Policy', path: '/privacy' },
              ].map((link, index) => (
                <Link 
                  key={index}
                  component={RouterLink} 
                  to={link.path} 
                  color="inherit" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 1.5, 
                    opacity: 0.8,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateX(5px)',
                    }
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: 14, mr: 1 }} />
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                position: 'relative',
                display: 'inline-block',
                mb: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 2
                }
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
              <LocationIcon sx={{ mr: 1.5, mt: 0.3, color: theme.palette.secondary.main }} />
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.7 }}>
                123 Tourism Street
                <br />
                Adventure City, AC 12345
              </Typography>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1.5, color: theme.palette.secondary.main }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1.5, color: theme.palette.secondary.main }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                info@locavista.com
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                position: 'relative',
                display: 'inline-block',
                mb: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 2
                }
              }}
            >
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8, lineHeight: 1.7 }}>
              Subscribe to our newsletter to receive updates on new destinations, travel tips, and exclusive offers.
            </Typography>
            <Box component="form" noValidate>
              <TextField
                fullWidth
                placeholder="Your email address"
                variant="outlined"
                size="small"
                sx={{
                  mb: 1.5,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.secondary.main,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    opacity: 1,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        edge="end" 
                        sx={{ color: theme.palette.secondary.main }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                By subscribing, you agree to our Privacy Policy.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} LocaVista. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link 
              component={RouterLink} 
              to="/terms" 
              color="inherit" 
              sx={{ 
                opacity: 0.7, 
                textDecoration: 'none',
                '&:hover': { opacity: 1 }
              }}
            >
              Terms
            </Link>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              color="inherit" 
              sx={{ 
                opacity: 0.7, 
                textDecoration: 'none',
                '&:hover': { opacity: 1 }
              }}
            >
              Privacy
            </Link>
            <Link 
              component={RouterLink} 
              to="/cookies" 
              color="inherit" 
              sx={{ 
                opacity: 0.7, 
                textDecoration: 'none',
                '&:hover': { opacity: 1 }
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
