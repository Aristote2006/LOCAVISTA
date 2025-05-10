import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Rating,
  IconButton,
  useTheme,
  alpha,
  Card,
  CardContent,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ArrowBack as ArrowBackIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getActivityById } from '../services/activityService';
import Layout from '../components/Layout/Layout';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ActivityDetailsPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  // Fetch activity details
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        console.log('Fetching activity with ID:', id);
        const result = await getActivityById(id);

        console.log('Activity fetch result:', result);

        if (result.success) {
          setActivity(result.data);
          // Fetch location info once we have the activity
          fetchLocationInfo(
            result.data.location.coordinates[1],
            result.data.location.coordinates[0]
          );
        } else {
          setError(result.message || 'Failed to fetch activity details');
          console.error('Failed to fetch activity:', result.message);
        }
      } catch (err) {
        setError('An error occurred while fetching activity details');
        console.error('Error fetching activity details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivity();
    } else {
      setError('Activity ID is missing');
    }
  }, [id]);

  // Fetch location information using reverse geocoding
  const fetchLocationInfo = async (lat, lon) => {
    try {
      setLocationLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (data) {
        setLocationInfo(data);
      }
    } catch (error) {
      console.error('Error fetching location info:', error);
    } finally {
      setLocationLoading(false);
    }
  };

  // Handle image carousel navigation
  const handlePrevImage = () => {
    if (!activity || !activity.images.length) return;
    setCurrentImage((prev) => (prev === 0 ? activity.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!activity || !activity.images.length) return;
    setCurrentImage((prev) => (prev === activity.images.length - 1 ? 0 : prev + 1));
  };

  // Format the address from location info
  const formatAddress = () => {
    if (!locationInfo || !locationInfo.address) return 'Location information not available';

    const address = locationInfo.address;
    const parts = [];

    // Add village/suburb if available
    if (address.village || address.suburb) {
      parts.push(address.village || address.suburb);
    }

    // Add sector/neighbourhood if available
    if (address.neighbourhood || address.quarter) {
      parts.push(address.neighbourhood || address.quarter);
    }

    // Add district/city if available
    if (address.city_district || address.city) {
      parts.push(address.city_district || address.city);
    }

    // Add county/state if available
    if (address.county || address.state) {
      parts.push(address.county || address.state);
    }

    // Add country
    if (address.country) {
      parts.push(address.country);
    }

    return parts.join(', ');
  };

  // Generate a random rating between 3.5 and 5 for demo purposes
  const rating = activity?.rating || (3.5 + Math.random() * 1.5);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 4 }}>
            {error}
          </Alert>
        ) : activity ? (
          <>
            {/* Back button */}
            <Button
              component={RouterLink}
              to="/"
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 3 }}
            >
              Back to Home
            </Button>

            <Grid container spacing={4}>
              {/* Left column - Images and basic info */}
              <Grid item xs={12} md={7}>
                {/* Image carousel */}
                <Paper
                  elevation={2}
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 3,
                    height: 400,
                  }}
                >
                  <Box
                    component="img"
                    src={activity.images[currentImage]}
                    alt={activity.name}
                    onError={(e) => {
                      console.log(`Image failed to load in details page: ${e.target.src}`);
                      // Try adding a cache-busting parameter
                      if (!e.target.src.includes('?v=')) {
                        e.target.src = `${e.target.src}?v=${new Date().getTime()}`;
                      } else if (!e.target.src.includes('placeholder')) {
                        // If that fails, use the placeholder
                        e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                      }
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {activity.images.length > 1 && (
                    <>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                        }}
                        onClick={handlePrevImage}
                      >
                        <ChevronLeftIcon />
                      </IconButton>

                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                        }}
                        onClick={handleNextImage}
                      >
                        <ChevronRightIcon />
                      </IconButton>

                      {/* Image indicators */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        {activity.images.map((_, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              backgroundColor: index === currentImage
                                ? 'white'
                                : 'rgba(255, 255, 255, 0.5)',
                              cursor: 'pointer',
                            }}
                            onClick={() => setCurrentImage(index)}
                          />
                        ))}
                      </Box>
                    </>
                  )}

                  {/* Featured badge */}
                  {activity.featured && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 0,
                        backgroundColor: theme.palette.secondary.main,
                        color: 'white',
                        py: 0.5,
                        px: 2,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: 2,
                      }}
                    >
                      <StarIcon fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="caption" fontWeight="bold">
                        FEATURED
                      </Typography>
                    </Box>
                  )}
                </Paper>

                {/* Activity details */}
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                      {activity.name}
                    </Typography>
                    <Chip
                      label={activity.type}
                      color="primary"
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                      }}
                    />
                  </Box>

                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating
                      value={rating}
                      precision={0.5}
                      readOnly
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {rating.toFixed(1)} ({Math.floor(Math.random() * 50) + 10} reviews)
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {activity.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1">{activity.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1">{activity.email}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Right column - Location info and map */}
              <Grid item xs={12} md={5}>
                {/* Location information */}
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Location Information
                  </Typography>

                  {locationLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                      <CircularProgress size={30} />
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <LocationIcon
                          sx={{
                            mr: 1,
                            color: 'primary.main',
                            mt: 0.5
                          }}
                        />
                        <Typography variant="body1">
                          {formatAddress()}
                        </Typography>
                      </Box>

                      {locationInfo && locationInfo.address && (
                        <Box sx={{ ml: 4 }}>
                          {locationInfo.address.village && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>Village:</strong> {locationInfo.address.village}
                            </Typography>
                          )}
                          {locationInfo.address.suburb && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>Suburb:</strong> {locationInfo.address.suburb}
                            </Typography>
                          )}
                          {(locationInfo.address.neighbourhood || locationInfo.address.quarter) && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>Sector:</strong> {locationInfo.address.neighbourhood || locationInfo.address.quarter}
                            </Typography>
                          )}
                          {(locationInfo.address.city_district || locationInfo.address.city) && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>District:</strong> {locationInfo.address.city_district || locationInfo.address.city}
                            </Typography>
                          )}
                          {locationInfo.address.county && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>County:</strong> {locationInfo.address.county}
                            </Typography>
                          )}
                          {locationInfo.address.state && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>State/Province:</strong> {locationInfo.address.state}
                            </Typography>
                          )}
                          {locationInfo.address.country && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>Country:</strong> {locationInfo.address.country}
                            </Typography>
                          )}
                        </Box>
                      )}

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Coordinates:</strong> {activity.location.coordinates[1]}, {activity.location.coordinates[0]}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Paper>

                {/* Map */}
                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', height: 300 }}>
                  <MapContainer
                    center={[
                      activity.location.coordinates[1],
                      activity.location.coordinates[0],
                    ]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[
                        activity.location.coordinates[1],
                        activity.location.coordinates[0],
                      ]}
                    >
                      <Popup>
                        <Typography variant="subtitle2">{activity.name}</Typography>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                          {activity.type}
                        </Typography>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Alert severity="info" sx={{ my: 4 }}>
            Activity not found
          </Alert>
        )}
      </Container>
    </Layout>
  );
};

export default ActivityDetailsPage;
