import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Button,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  Explore as ExploreIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Star as StarIcon,
  Visibility as VisibilityIcon,
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
  LocalActivity as ActivityIcon,
  Museum as MuseumIcon,
  Park as ParkIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useGeolocation } from '../hooks/useGeolocation';
import ActivityCard from '../components/Activities/ActivityCard';
import Layout from '../components/Layout/Layout';
import { useActivities } from '../context/ActivityContext.jsx';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const activityTypes = [
  'all',
  'hotel',
  'resort',
  'restaurant',
  'adventure',
  'park',
  'museum',
  'other',
];

// Distance calculation is now handled in the ActivityContext



// Popular categories data
const popularCategories = [
  { name: "Hotels", icon: <HotelIcon />, color: "#2196F3" },
  { name: "Restaurants", icon: <RestaurantIcon />, color: "#FF9800" },
  { name: "Activities", icon: <ActivityIcon />, color: "#4CAF50" },
  { name: "Parks", icon: <ParkIcon />, color: "#8BC34A" },
  { name: "Museums", icon: <MuseumIcon />, color: "#9C27B0" },
];

const HomePage = () => {
  const theme = useTheme();
  // We still need latitude/longitude for UI display purposes
  const { latitude, longitude, error: locationError } = useGeolocation();
  const { activities, loading, error } = useActivities();
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityType, setActivityType] = useState('all');
  const [showFeatured, setShowFeatured] = useState(false);
  const [showMap, setShowMap] = useState(false);



  // The activities are now fetched from the ActivityContext
  // which handles all the logic for fetching, sorting by distance, etc.

  // Set filtered activities when activities change
  useEffect(() => {
    if (activities.length > 0) {
      setFilteredActivities(activities);
    }
  }, [activities]);

  // Filter activities based on search term, type, and featured status
  useEffect(() => {
    let filtered = [...activities];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (activityType !== 'all') {
      filtered = filtered.filter(activity => activity.type === activityType);
    }

    // Filter by featured status
    if (showFeatured) {
      filtered = filtered.filter(activity => activity.featured);
    }

    setFilteredActivities(filtered);
  }, [searchTerm, activityType, showFeatured, activities]);

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '90vh',
          minHeight: '650px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1968&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
            zIndex: 1
          }
        }}
      >
        {/* Animated overlay elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: 0.4,
            background: 'radial-gradient(circle at 20% 80%, rgba(41, 98, 255, 0.2) 0%, transparent 33%), ' +
                        'radial-gradient(circle at 80% 20%, rgba(0, 200, 83, 0.2) 0%, transparent 33%)',
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            px: { xs: 2, md: 4 }
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              mb: 2,
              p: 1,
              px: 2,
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.main,
                  display: 'inline-block',
                }}
              />
              Discover the world around you
            </Typography>
          </Box>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
              fontWeight: 800,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              background: 'linear-gradient(90deg, #ffffff, #e8f5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              lineHeight: 1.1,
            }}
          >
            Explore Extraordinary<br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Destinations
            </Box>
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              mb: 5,
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              lineHeight: 1.5,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Discover amazing local attractions, hidden gems, and create unforgettable
            memories with our curated collection of exceptional experiences
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/explore"
              startIcon={<ExploreIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 25px rgba(0,0,0,0.4)'
                }
              }}
            >
              Explore Destinations
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => document.getElementById('find-destination').scrollIntoView({ behavior: 'smooth' })}
              startIcon={<SearchIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 600,
                borderColor: 'white',
                color: 'white',
                borderWidth: 2,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Search Nearby
            </Button>
          </Box>

          {/* Stats indicators */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 3, md: 5 },
              mt: 8,
              flexWrap: 'wrap',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              p: 3,
              maxWidth: 'fit-content',
              mx: 'auto',
            }}
          >
            {[
              { value: '500+', label: 'Destinations' },
              { value: '10K+', label: 'Happy Travelers' },
              { value: '4.8', label: 'Average Rating' },
            ].map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: index === 1 ? theme.palette.secondary.main : 'white',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Featured Categories Section */}
      <Box sx={{ py: 6, backgroundColor: alpha(theme.palette.primary.light, 0.05) }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 2
                }
              }}
            >
              Explore by Category
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 3, maxWidth: 700, mx: 'auto' }}
            >
              Discover the best places and experiences sorted by category
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {popularCategories.map((category, index) => (
              <Grid item key={index} xs={6} sm={4} md={2.4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: alpha(category.color, 0.1),
                      color: category.color,
                      width: 60,
                      height: 60,
                      mb: 1.5
                    }}
                  >
                    {category.icon}
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {category.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Destinations Section */}
      <Box
        id="featured-destinations"
        sx={{
          py: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%234CAF50" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E")',
            zIndex: -1,
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'inline-block',
                mb: 2,
                px: 2,
                py: 0.5,
                borderRadius: '20px',
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
              }}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                Handpicked for You
              </Typography>
            </Box>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(90deg, #1E88E5, #4CAF50)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Featured Destinations
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                mb: 5,
                fontSize: '1.1rem',
              }}
            >
              Explore our curated selection of extraordinary places that offer unforgettable experiences
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
              {['All', 'Adventure', 'Resort', 'Museum', 'Restaurant', 'Hotel'].map((type, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? 'contained' : 'outlined'}
                  color={index === 0 ? 'primary' : 'inherit'}
                  sx={{
                    borderRadius: '50px',
                    px: 2,
                    py: 0.75,
                    textTransform: 'none',
                    fontWeight: 600,
                    minWidth: 'auto',
                  }}
                >
                  {type}
                </Button>
              ))}
            </Box>

            {/* Display Featured Activities */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ my: 4, borderRadius: 2 }}>
                {error}
              </Alert>
            ) : (
              <>
                {activities.filter(activity => activity.featured).length > 0 ? (
                  <Grid container spacing={3}>
                    {activities
                      .filter(activity => activity.featured)
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Show newest first
                      .slice(0, 3) // Show only the first 3 featured activities
                      .map((activity) => (
                        <Grid item xs={12} sm={6} md={4} key={activity._id}>
                          <ActivityCard activity={activity} distance={activity.distance} />
                        </Grid>
                      ))}
                  </Grid>
                ) : (
                  <Alert severity="info" sx={{ my: 4, borderRadius: 2 }}>
                    No featured activities available yet. Admin-created featured activities will appear here.
                  </Alert>
                )}
              </>
            )}
          </Box>


        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(90deg, #1E88E5, #4CAF50)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              How LocaVista Works
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              Discover amazing places around you in just a few simple steps
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <SearchIcon sx={{ fontSize: 40 }} />,
                title: "Search",
                description: "Enter your location or allow us to detect it automatically to find attractions near you.",
                color: "#2196F3"
              },
              {
                icon: <ExploreIcon sx={{ fontSize: 40 }} />,
                title: "Explore",
                description: "Browse through our curated list of attractions, filter by category, distance, or ratings.",
                color: "#4CAF50"
              },
              {
                icon: <StarIcon sx={{ fontSize: 40 }} />,
                title: "Experience",
                description: "Visit the places, create memories, and share your experiences with the community.",
                color: "#FF9800"
              }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    position: 'relative',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: alpha(step.color, 0.1),
                      color: step.color,
                      mb: 3,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: -5,
                        left: -5,
                        right: -5,
                        bottom: -5,
                        borderRadius: '50%',
                        border: `2px dashed ${step.color}`,
                        opacity: 0.5,
                      }
                    }}
                  >
                    {step.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: step.color,
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {step.description}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: step.color,
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    Learn More
                    <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: alpha(theme.palette.primary.light, 0.05),
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%234CAF50" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E")',
            zIndex: -1,
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box
              sx={{
                display: 'inline-block',
                mb: 2,
                px: 2,
                py: 0.5,
                borderRadius: '20px',
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
              }}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                What People Say
              </Typography>
            </Box>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(90deg, #1E88E5, #4CAF50)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Traveler Testimonials
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              Hear from our community of explorers who have discovered amazing places with LocaVista
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                rating: 5,
                text: "LocaVista helped me discover hidden gems in my own city that I never knew existed! The recommendations were spot-on and I had an amazing weekend exploring new places.",
              },
              {
                name: "Michael Chen",
                location: "Toronto, Canada",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                rating: 5,
                text: "As a frequent traveler, I rely on LocaVista to find authentic local experiences wherever I go. It's like having a local friend in every city showing you the best spots!",
              },
              {
                name: "Emma Rodriguez",
                location: "Barcelona, Spain",
                avatar: "https://randomuser.me/api/portraits/women/63.jpg",
                rating: 4,
                text: "The app is incredibly user-friendly and the location-based recommendations are always excellent. I've found some amazing restaurants and attractions I would have missed otherwise.",
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: 6,
                      background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.location}
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 0.5 }}>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            sx={{
                              fontSize: 18,
                              color: i < testimonial.rating ? '#FFC107' : 'rgba(0, 0, 0, 0.1)',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontStyle: 'italic',
                      color: 'text.secondary',
                      flexGrow: 1,
                      position: 'relative',
                      pl: 2,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        borderRadius: 4,
                      }
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>



      {/* Search and Activities Section */}
      <Box id="find-destination" sx={{ py: 6, backgroundColor: alpha(theme.palette.primary.light, 0.05) }}>
        <Container maxWidth="lg">
          {/* Search Box */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 5,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(232,245,233,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(46, 125, 50, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  width: 5,
                  height: 30,
                  mr: 2,
                  borderRadius: 5
                }}
              />
              <Typography variant="h5" component="h2" fontWeight="bold">
                Find Your Next Adventure
              </Typography>
            </Box>

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Search activities, places, or experiences"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon color="primary" sx={{ mr: 1 }} />,
                  }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Activity Type</InputLabel>
                  <Select
                    value={activityType}
                    label="Activity Type"
                    onChange={(e) => setActivityType(e.target.value)}
                    sx={{
                      borderRadius: '50px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                      }
                    }}
                  >
                    {activityTypes.map((type) => (
                      <MenuItem key={type} value={type} sx={{ textTransform: 'capitalize' }}>
                        {type === 'all' ? 'All Types' : type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Featured</InputLabel>
                  <Select
                    value={showFeatured ? 'featured' : 'all'}
                    label="Featured"
                    onChange={(e) => setShowFeatured(e.target.value === 'featured')}
                    sx={{
                      borderRadius: '50px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                      }
                    }}
                  >
                    <MenuItem value="all">All Activities</MenuItem>
                    <MenuItem value="featured">Featured Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant={showMap ? 'contained' : 'outlined'}
                  color={showMap ? 'secondary' : 'primary'}
                  onClick={() => setShowMap(!showMap)}
                  startIcon={showMap ? <VisibilityIcon /> : <LocationIcon />}
                  sx={{
                    borderRadius: '50px',
                    py: 1.5,
                    boxShadow: showMap ? 3 : 1,
                  }}
                >
                  {showMap ? 'Hide Map' : 'Show Map'}
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Map Section */}
          {showMap && latitude && longitude && (
            <Box sx={{ height: 400, mb: 4, borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
              <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* User location marker */}
                <Marker position={[latitude, longitude]}>
                  <Popup>Your location</Popup>
                </Marker>

                {/* Activity markers */}
                {filteredActivities.map((activity) => (
                  <Marker
                    key={activity._id}
                    position={[
                      activity.location.coordinates[1],
                      activity.location.coordinates[0],
                    ]}
                  >
                    <Popup>
                      <Typography variant="subtitle1">{activity.name}</Typography>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{activity.type}</Typography>
                      {activity.distance && (
                        <Typography variant="body2">
                          {activity.distance < 1
                            ? `${Math.round(activity.distance * 1000)} m away`
                            : `${activity.distance.toFixed(1)} km away`}
                        </Typography>
                      )}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Box>
          )}

          {/* Location Error Alert */}
          {locationError && (
            <Alert severity="warning" sx={{ mb: 4, borderRadius: 2 }}>
              {locationError}. Some features may be limited without location access.
            </Alert>
          )}

          {/* Activities Section */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ my: 4, borderRadius: 2 }}>
              {error}
            </Alert>
          ) : (
            <>
              {activities.length === 0 ? (
                <Alert severity="info" sx={{ my: 4, borderRadius: 2 }}>
                  No activities have been added yet. Check back later for exciting destinations!
                </Alert>
              ) : filteredActivities.length > 0 ? (
                <>
                  {/* Featured Activities */}
                  {showFeatured && filteredActivities.some(activity => activity.featured) && (
                    <Box sx={{ mt: 4, mb: 6 }}>
                      <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                          fontWeight: 700,
                          mb: 3,
                          position: 'relative',
                          display: 'inline-block',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -10,
                            left: 0,
                            width: 60,
                            height: 4,
                            backgroundColor: theme.palette.secondary.main,
                            borderRadius: 2
                          }
                        }}
                      >
                        Featured Activities
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      <Grid container spacing={3}>
                        {filteredActivities
                          .filter((activity) => activity.featured)
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Show newest first
                          .map((activity) => (
                            <Grid item xs={12} sm={6} md={4} key={activity._id}>
                              <ActivityCard activity={activity} distance={activity.distance} />
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  textAlign: 'right',
                                  mt: 0.5,
                                  color: 'text.secondary',
                                  fontStyle: 'italic'
                                }}
                              >
                                Added: {new Date(activity.createdAt).toLocaleDateString()}
                              </Typography>
                            </Grid>
                          ))}
                      </Grid>
                    </Box>
                  )}

                  {/* All Activities */}
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        position: 'relative',
                        display: 'inline-block',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -10,
                          left: 0,
                          width: 60,
                          height: 4,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: 2
                        }
                      }}
                    >
                      {showFeatured ? 'All Activities' : 'Activities Near You'}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                      {filteredActivities
                        .sort((a, b) => {
                          // If both have distance, sort by distance
                          if (a.distance && b.distance) {
                            return a.distance - b.distance;
                          }
                          // If only one has distance, prioritize the one with distance
                          if (a.distance) return -1;
                          if (b.distance) return 1;
                          // Otherwise sort by creation date
                          return new Date(b.createdAt) - new Date(a.createdAt);
                        })
                        .map((activity) => (
                          <Grid item xs={12} sm={6} md={4} key={activity._id}>
                            <ActivityCard activity={activity} distance={activity.distance} />
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                textAlign: 'right',
                                mt: 0.5,
                                color: 'text.secondary',
                                fontStyle: 'italic'
                              }}
                            >
                              Added: {new Date(activity.createdAt).toLocaleDateString()}
                            </Typography>
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                </>
              ) : (
                <Alert severity="info" sx={{ my: 4, borderRadius: 2 }}>
                  No activities found matching your criteria. Try adjusting your filters.
                </Alert>
              )}
            </>
          )}
        </Container>
      </Box>



      {/* Newsletter Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette.secondary.main, 0.05),
            zIndex: 0,
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff, #f5f5f5)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(90deg, #1E88E5, #4CAF50)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Join Our Newsletter
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              Subscribe to receive travel inspiration, exclusive deals, and tips for your next adventure
            </Typography>

            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                maxWidth: 600,
                mx: 'auto',
                mb: 3,
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email address"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      }
                    }
                  }
                }}
              />

              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '50px',
                  py: 1.5,
                  px: { xs: 3, sm: 4 },
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 4px 14px rgba(46, 125, 50, 0.25)',
                  whiteSpace: 'nowrap',
                  minWidth: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(46, 125, 50, 0.35)',
                  }
                }}
              >
                Subscribe Now
              </Button>
            </Box>

            <Typography variant="caption" color="text.secondary">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
                mt: 4,
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'Weekly Travel Tips', icon: '📝' },
                { label: 'Exclusive Deals', icon: '🎁' },
                { label: 'Destination Guides', icon: '🗺️' },
                { label: 'No Spam Ever', icon: '✅' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ mr: 0.5, fontSize: '1.2rem' }}>
                      {item.icon}
                    </Box>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default HomePage;
