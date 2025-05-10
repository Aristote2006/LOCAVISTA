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
  Card,
  CardContent,
  CardMedia,
  Chip,
  Slider,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  Clear as ClearIcon,
  Map as MapIcon,
  ViewList as ListIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import { getActivities } from '../services/activityService';
import Layout from '../components/Layout/Layout';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ExplorePage = () => {
  const theme = useTheme();
  const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();

  // State variables
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activityType, setActivityType] = useState('all');
  const [distance, setDistance] = useState(10);
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Activity types for filter
  const activityTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'hotel', label: 'Hotels' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'museum', label: 'Museums' },
    { value: 'park', label: 'Parks' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'resort', label: 'Resorts' },
  ];

  // Fetch activities when location is available
  useEffect(() => {
    const fetchActivities = async () => {
      if (locationLoading) return;

      try {
        setLoading(true);
        setError('');

        // If location is available, use it; otherwise use default coordinates
        const params = {};
        if (latitude && longitude) {
          params.latitude = latitude;
          params.longitude = longitude;
        }

        const result = await getActivities(params);

        if (result.success) {
          setActivities(result.data);
          setFilteredActivities(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch activities. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [latitude, longitude, locationLoading]);

  // Filter activities based on search term, type, and distance
  useEffect(() => {
    if (!activities.length) return;

    let filtered = [...activities];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(term) ||
        activity.description.toLowerCase().includes(term)
      );
    }

    // Filter by type
    if (activityType !== 'all') {
      filtered = filtered.filter(activity => activity.type === activityType);
    }

    // Filter by distance
    if (latitude && longitude && distance < 100) {
      filtered = filtered.filter(activity => activity.distance <= distance);
    }

    // Sort activities
    if (sortBy === 'distance' && latitude && longitude) {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredActivities(filtered);
  }, [activities, searchTerm, activityType, distance, sortBy, latitude, longitude]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setActivityType('all');
    setDistance(10);
    setSortBy('distance');
  };

  // Get icon for activity type
  const getActivityTypeIcon = (type) => {
    switch (type) {
      case 'hotel':
        return '🏨';
      case 'restaurant':
        return '🍽️';
      case 'museum':
        return '🏛️';
      case 'park':
        return '🌳';
      case 'adventure':
        return '🏔️';
      case 'resort':
        return '🏖️';
      default:
        return '📍';
    }
  };

  // Format distance
  const formatDistance = (distance) => {
    if (!distance && distance !== 0) return 'Unknown distance';
    return distance < 1
      ? `${Math.round(distance * 1000)} m away`
      : `${distance.toFixed(1)} km away`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '40vh',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              background: 'linear-gradient(90deg, #ffffff, #e8f5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Explore Amazing Places
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              lineHeight: 1.5,
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
            }}
          >
            Discover incredible activities and destinations near you
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search activities, places, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                endAdornment: searchTerm && (
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                ),
                sx: {
                  bgcolor: 'white',
                  borderRadius: '50px',
                  px: 2,
                  py: 0.5,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setFiltersOpen(!filtersOpen)}
              startIcon={<FilterIcon />}
              sx={{
                borderRadius: '50px',
                px: 3,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              Filters
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Filters Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            display: filtersOpen ? 'block' : 'none',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Filters
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleResetFilters}
              startIcon={<ClearIcon />}
              sx={{ borderRadius: '50px' }}
            >
              Reset All
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  label="Activity Type"
                >
                  {activityTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="distance">Distance</MenuItem>
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography gutterBottom>
                Distance (km): {distance === 100 ? 'Any distance' : `${distance} km`}
              </Typography>
              <Slider
                value={distance}
                onChange={(e, newValue) => setDistance(newValue)}
                min={1}
                max={100}
                step={1}
                marks={[
                  { value: 1, label: '1km' },
                  { value: 50, label: '50km' },
                  { value: 100, label: 'Any' },
                ]}
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* View Toggle and Results Count */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            {filteredActivities.length} {filteredActivities.length === 1 ? 'result' : 'results'} found
          </Typography>
          <Box>
            <Button
              variant={showMap ? 'outlined' : 'contained'}
              size="small"
              startIcon={<ListIcon />}
              onClick={() => setShowMap(false)}
              sx={{ mr: 1, borderRadius: '50px' }}
            >
              List
            </Button>
            <Button
              variant={showMap ? 'contained' : 'outlined'}
              size="small"
              startIcon={<MapIcon />}
              onClick={() => setShowMap(true)}
              sx={{ borderRadius: '50px' }}
            >
              Map
            </Button>
          </Box>
        </Box>

        {/* Loading and Error States */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 6, flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Loading activities...
            </Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 4 }}>
            {error}
          </Alert>
        ) : filteredActivities.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 3,
              textAlign: 'center',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography variant="h5" gutterBottom>
              No activities found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Try adjusting your filters or search term to find more results.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetFilters}
              sx={{ mt: 2, borderRadius: '50px' }}
            >
              Reset Filters
            </Button>
          </Paper>
        ) : showMap ? (
          // Map View
          <Box sx={{ height: '70vh', borderRadius: 3, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
            <MapContainer
              center={latitude && longitude ? [latitude, longitude] : [0, 0]}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* User location marker */}
              {latitude && longitude && (
                <Marker
                  position={[latitude, longitude]}
                  icon={new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                  })}
                >
                  <Popup>
                    <Typography variant="body2" fontWeight={600}>Your Location</Typography>
                  </Popup>
                </Marker>
              )}

              {/* Activity markers */}
              {filteredActivities.map((activity) => (
                <Marker
                  key={activity._id}
                  position={[
                    activity.location.coordinates[1],
                    activity.location.coordinates[0],
                  ]}
                  icon={new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                  })}
                >
                  <Popup>
                    <Typography variant="body2" fontWeight={600}>{activity.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </Typography>
                    {activity.distance && (
                      <Typography variant="body2">
                        {formatDistance(activity.distance)}
                      </Typography>
                    )}
                    <Button
                      component={RouterLink}
                      to={`/activities/details/${activity._id}`}
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{ mt: 1, borderRadius: '50px', textTransform: 'none' }}
                    >
                      View Details
                    </Button>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        ) : (
          // List View
          <Grid container spacing={3}>
            {filteredActivities.map((activity) => (
              <Grid item xs={12} sm={6} md={4} key={activity._id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={activity.images && activity.images.length > 0
                        ? activity.images[0]
                        : 'https://via.placeholder.com/400x200?text=No+Image'}
                      alt={activity.name}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'background.paper',
                        borderRadius: '50px',
                        px: 1.5,
                        py: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Typography variant="body2" fontWeight={600} sx={{ mr: 0.5 }}>
                        {getActivityTypeIcon(activity.type)}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                        {activity.type}
                      </Typography>
                    </Box>

                    {activity.featured && (
                      <Chip
                        label="Featured"
                        color="secondary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          fontWeight: 600,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" component="h3" fontWeight={700} gutterBottom>
                      {activity.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: 18, mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatDistance(activity.distance)}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.5,
                      }}
                    >
                      {activity.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          Contact:
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {activity.phone}
                        </Typography>
                      </Box>

                      <Button
                        component={RouterLink}
                        to={`/activities/details/${activity._id}`}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          borderRadius: '50px',
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 2,
                        }}
                      >
                        Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default ExplorePage;
