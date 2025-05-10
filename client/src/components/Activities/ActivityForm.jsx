import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  InputAdornment,
  Tooltip,
  IconButton,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import {
  MyLocation as MyLocationIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { uploadImages } from '../../services/activityService';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Map click handler component
const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

// Map controller to update view when coordinates change
const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return null;
};

const activityTypes = [
  'hotel',
  'resort',
  'restaurant',
  'saloon',
  'clinic',
  'hospital',
  'motel',
  'lodge',
  'adventure',
  'park',
  'museum',
  'other',
];

const ActivityForm = ({ initialData, onSubmit, isLoading }) => {
  const theme = useTheme();
  const mapRef = useRef(null);
  const [position, setPosition] = useState(
    initialData
      ? [
          initialData.location.coordinates[1],
          initialData.location.coordinates[0],
        ]
      : null
  );
  const [images, setImages] = useState(initialData?.images || []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: initialData?.name || '',
      type: initialData?.type || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      description: initialData?.description || '',
      featured: initialData?.featured || false,
    },
  });

  useEffect(() => {
    if (position) {
      setValue('latitude', position[0]);
      setValue('longitude', position[1]);
    }
  }, [position, setValue]);

  // Handle manual latitude/longitude input
  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);

    if (!isNaN(numValue)) {
      if (name === 'latitude') {
        // Validate latitude range (-90 to 90)
        if (numValue >= -90 && numValue <= 90) {
          setPosition([numValue, position ? position[1] : 0]);
        }
      } else if (name === 'longitude') {
        // Validate longitude range (-180 to 180)
        if (numValue >= -180 && numValue <= 180) {
          setPosition([position ? position[0] : 0, numValue]);
        }
      }
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Search for an address using Nominatim (OpenStreetMap)
  const searchByAddress = async () => {
    if (!searchAddress.trim()) return;

    try {
      setSearchLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error('Error searching for address:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        type: initialData.type,
        email: initialData.email,
        phone: initialData.phone,
        description: initialData.description,
        featured: initialData.featured,
      });
      setImages(initialData.images);
      setPosition([
        initialData.location.coordinates[1],
        initialData.location.coordinates[0],
      ]);
    }
  }, [initialData, reset]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length > 3) {
      setUploadError('You can upload a maximum of 3 images');
      return;
    }

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const result = await uploadImages(formData);

      if (result.success) {
        setImages(result.urls);
      } else {
        setUploadError(result.message);
      }
    } catch (error) {
      setUploadError('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const onFormSubmit = (data) => {
    if (!position) {
      return;
    }

    if (images.length === 0) {
      setUploadError('Please upload at least one image');
      return;
    }

    // Ensure featured flag is properly set (boolean)
    const featured = data.featured === true;

    const formData = {
      ...data,
      featured, // Ensure it's a boolean
      latitude: position[0],
      longitude: position[1],
      images,
      // Add timestamp if it's a new activity
      ...(initialData ? {} : { createdAt: new Date().toISOString() })
    };

    // Log for debugging
    console.log('Submitting activity form data:', formData);

    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Type is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel>Type</InputLabel>
                      <Select {...field} label="Type">
                        {activityTypes.map((type) => (
                          <MenuItem key={type} value={type} sx={{ textTransform: 'capitalize' }}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.type && (
                        <FormHelperText>{errors.type.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: 'Phone is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: 'Description is required',
                    maxLength: {
                      value: 250,
                      message: 'Description cannot exceed 250 characters',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={
                        errors.description?.message ||
                        `${field.value.length}/250 characters`
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.05),
                    borderRadius: 2,
                    border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Controller
                      name="featured"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              color="primary"
                              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600} color="primary">
                                Featured Activity
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Featured activities will appear on the homepage in the "Featured Destinations" section
                              </Typography>
                            </Box>
                          }
                        />
                      )}
                    />
                    <Tooltip title="Check this box to make this activity appear in the Featured Destinations section on the homepage">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                Location
              </Typography>
              <Tooltip title="Get your current location">
                <IconButton
                  onClick={getCurrentLocation}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    }
                  }}
                >
                  <MyLocationIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography variant="body2" color="text.secondary" paragraph>
              Set the location by clicking on the map or entering coordinates manually
            </Typography>

            {/* Address search */}
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                label="Search by address"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchByAddress()}
                placeholder="Enter an address, city, or landmark"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <IconButton
                          edge="end"
                          onClick={searchByAddress}
                          disabled={!searchAddress.trim()}
                        >
                          <SearchIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Map container */}
            <Box
              sx={{
                height: 300,
                mb: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <MapContainer
                center={position || [0, 0]}
                zoom={position ? 13 : 2}
                style={{ height: '100%', width: '100%' }}
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} />
                <MapController position={position} />
              </MapContainer>

              {/* Map overlay instructions */}
              {!position && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    right: 10,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    p: 1,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <InfoIcon color="primary" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Click anywhere on the map to set the location
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Coordinates section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Coordinates
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Latitude"
                    name="latitude"
                    value={position ? position[0] : ''}
                    onChange={handleCoordinateChange}
                    fullWidth
                    helperText="Enter a value between -90 and 90"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon fontSize="small" color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: position && (
                        <InputAdornment position="end">
                          <Typography variant="caption" color="text.secondary">
                            °N/S
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                    inputProps={{
                      step: 0.000001,
                      min: -90,
                      max: 90
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Longitude"
                    name="longitude"
                    value={position ? position[1] : ''}
                    onChange={handleCoordinateChange}
                    fullWidth
                    helperText="Enter a value between -180 and 180"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon fontSize="small" color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: position && (
                        <InputAdornment position="end">
                          <Typography variant="caption" color="text.secondary">
                            °E/W
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                    inputProps={{
                      step: 0.000001,
                      min: -180,
                      max: 180
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Location status */}
            {position ? (
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <LocationIcon fontSize="small" />
                <Typography variant="body2" fontWeight={500}>
                  Location set successfully
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <InfoIcon fontSize="small" />
                <Typography variant="body2" fontWeight={500}>
                  Please set a location using the map or coordinates
                </Typography>
              </Box>
            )}
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload up to 3 images (required)
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                component="label"
                disabled={uploading}
                startIcon={uploading ? <CircularProgress size={20} /> : null}
              >
                {uploading ? 'Uploading...' : 'Upload Images'}
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
            {uploadError && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {uploadError}
              </Typography>
            )}
            <Grid container spacing={1}>
              {images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    onError={(e) => {
                      console.log(`Image failed to load in form: ${e.target.src}`);
                      // Try adding a cache-busting parameter
                      if (!e.target.src.includes('?v=')) {
                        e.target.src = `${e.target.src}?v=${new Date().getTime()}`;
                      } else if (!e.target.src.includes('placeholder')) {
                        // If that fails, use the placeholder
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }
                    }}
                    sx={{
                      width: '100%',
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading
                ? 'Saving...'
                : initialData
                ? 'Update Activity'
                : 'Add Activity'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivityForm;
