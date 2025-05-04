import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Rating,
  Divider,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const ActivityCard = ({ activity, distance, onEdit, onDelete, isAdmin = false }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? activity.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === activity.images.length - 1 ? 0 : prev + 1));
  };

  // Generate a random rating between 3.5 and 5 for demo purposes
  const rating = activity.rating || (3.5 + Math.random() * 1.5);

  return (
    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
      <Card
        className="card-hover"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className="carousel-container">
          <div className="carousel-slide">
            <img
              src={activity.images[currentImage]}
              alt={activity.name}
              className="carousel-image"
            />
          </div>
          {activity.images.length > 1 && (
            <>
              <IconButton
                className="carousel-button carousel-button-prev"
                onClick={handlePrevImage}
                size="small"
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                className="carousel-button carousel-button-next"
                onClick={handleNextImage}
                size="small"
              >
                <ChevronRightIcon />
              </IconButton>

              {/* Image indicators */}
              <Box className="carousel-indicators">
                {activity.images.map((_, index) => (
                  <Box
                    key={index}
                    className={`carousel-indicator ${index === currentImage ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(index);
                    }}
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
                top: 0,
                left: 0,
                backgroundColor: 'secondary.main',
                color: 'white',
                py: 0.5,
                px: 1.5,
                borderBottomRightRadius: 16,
                display: 'flex',
                alignItems: 'center',
                boxShadow: 2,
                zIndex: 1,
              }}
            >
              <StarIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="caption" fontWeight="bold">
                FEATURED
              </Typography>
            </Box>
          )}

          {/* Distance badge */}
          {distance && (
            <Chip
              icon={<LocationIcon fontSize="small" />}
              label={distance < 1
                ? `${Math.round(distance * 1000)} m away`
                : `${distance.toFixed(1)} km away`}
              size="small"
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                fontWeight: 'bold',
                boxShadow: 2,
                zIndex: 1,
              }}
            />
          )}
        </div>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              {activity.name}
            </Typography>
            <Chip
              label={activity.type}
              size="small"
              color="primary"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                borderRadius: '12px',
              }}
            />
          </Box>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Rating
              value={rating}
              precision={0.5}
              readOnly
              size="small"
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {rating.toFixed(1)}
            </Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              mb: 2,
            }}
          >
            {activity.description}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">{activity.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '200px',
                }}
              >
                {activity.email}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ p: 1.5, justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<InfoIcon />}
            sx={{ borderRadius: '20px' }}
          >
            View Details
          </Button>

          {isAdmin && (
            <Box>
              <Tooltip title="Edit">
                <IconButton size="small" color="primary" onClick={() => onEdit(activity._id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small" color="error" onClick={() => onDelete(activity._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </CardActions>
      </Card>
    </Zoom>
  );
};

export default ActivityCard;
