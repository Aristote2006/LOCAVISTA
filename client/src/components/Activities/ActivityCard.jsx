import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Paper,
  alpha,
  useTheme,
  Avatar,
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
  AccessTime as AccessTimeIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

const ActivityCard = ({ activity, distance, onEdit, onDelete, isAdmin = false }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (activity && activity.images && activity.images.length > 0) {
      setCurrentImage((prev) => (prev === 0 ? activity.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (activity && activity.images && activity.images.length > 0) {
      setCurrentImage((prev) => (prev === activity.images.length - 1 ? 0 : prev + 1));
    }
  };

  // Generate a random rating between 3.5 and 5 for demo purposes
  const rating = activity.rating || (3.5 + Math.random() * 1.5);

  // Generate random review count for demo purposes
  const reviewCount = Math.floor(Math.random() * 50) + 5;

  // Format date for display
  const formattedDate = new Date(activity.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
      <Card
        className="card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '16px',
          boxShadow: isHovered
            ? theme.palette.mode === 'dark'
              ? '0 16px 32px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              : '0 16px 32px rgba(0, 0, 0, 0.15), 0 3px 8px rgba(0, 0, 0, 0.1)'
            : theme.palette.mode === 'dark'
              ? '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              : '0 6px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px)' : 'none',
        }}
      >
        {/* Image carousel with gradient overlay */}
        <Box
          sx={{
            position: 'relative',
            height: 220,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={activity.images && activity.images.length > 0
              ? activity.images[currentImage]
              : 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={activity.name}
            onError={(e) => {
              console.log(`Image failed to load: ${e.target.src}`);
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
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 100%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 100%)',
              zIndex: 1,
            }}
          />

          {/* Navigation buttons */}
          {activity.images && activity.images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevImage}
                size="small"
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(30, 30, 30, 0.8)'
                    : 'rgba(255, 255, 255, 0.8)',
                  color: theme.palette.mode === 'dark' ? '#FFFFFF' : 'inherit',
                  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(40, 40, 40, 0.9)'
                      : 'rgba(255, 255, 255, 0.95)',
                  },
                  zIndex: 2,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                size="small"
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(30, 30, 30, 0.8)'
                    : 'rgba(255, 255, 255, 0.8)',
                  color: theme.palette.mode === 'dark' ? '#FFFFFF' : 'inherit',
                  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(40, 40, 40, 0.9)'
                      : 'rgba(255, 255, 255, 0.95)',
                  },
                  zIndex: 2,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <ChevronRightIcon />
              </IconButton>

              {/* Image indicators */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                  zIndex: 2,
                }}
              >
                {activity.images.map((_, index) => (
                  <Box
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(index);
                    }}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: index === currentImage ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.2)',
                        backgroundColor: 'white',
                      }
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 2,
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
                top: 16,
                right: 16,
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(30, 30, 30, 0.85)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                fontWeight: 'bold',
                color: theme.palette.mode === 'dark' ? '#FFFFFF' : 'inherit',
                border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 2px 8px rgba(0,0,0,0.3)'
                  : '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 2,
                '& .MuiChip-icon': {
                  color: theme.palette.primary.main,
                }
              }}
            />
          )}

          {/* Type badge at bottom */}
          <Chip
            label={activity.type}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: alpha(theme.palette.primary.main, 0.9),
              color: 'white',
              zIndex: 2,
              borderRadius: '12px',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3, pt: 2.5 }}>
          {/* Title and date */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              fontWeight="bold"
              sx={{
                fontSize: '1.25rem',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {activity.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', ml: 1, flexShrink: 0 }}>
              <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">
                {formattedDate}
              </Typography>
            </Box>
          </Box>

          {/* Rating with reviews count */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              value={rating}
              precision={0.5}
              readOnly
              size="small"
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#FF9800',
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {rating.toFixed(1)} ({reviewCount} reviews)
            </Typography>
          </Box>

          {/* Description */}
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
              lineHeight: 1.6,
            }}
          >
            {activity.description}
          </Typography>

          {/* Contact info with styled icons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              mb: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  mr: 1.5,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primary.main, 0.2)
                    : alpha(theme.palette.primary.main, 0.1),
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : 'none',
                }}
              >
                <PhoneIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
              </Avatar>
              <Typography variant="body2">{activity.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  mr: 1.5,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primary.main, 0.2)
                    : alpha(theme.palette.primary.main, 0.1),
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : 'none',
                }}
              >
                <EmailIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
              </Avatar>
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

        {/* Action buttons */}
        <CardActions
          sx={{
            p: 0,
            px: 3,
            pb: 3,
            pt: 0,
            justifyContent: 'space-between',
            mt: -1,
          }}
        >
          <Button
            component={RouterLink}
            to={`/activities/details/${activity._id}`}
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<InfoIcon />}
            sx={{
              borderRadius: '50px',
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundImage: theme.palette.mode === 'dark'
                ? 'linear-gradient(145deg, rgba(70, 70, 70, 0.2) 0%, rgba(30, 30, 30, 0.1) 100%)'
                : 'none',
              '&:hover': {
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 6px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)'
                  : '0 6px 16px rgba(0, 0, 0, 0.2)',
              }
            }}
          >
            View Details
          </Button>

          {isAdmin ? (
            <Box>
              <Tooltip title="Edit" arrow>
                <IconButton
                  color="primary"
                  onClick={() => onEdit(activity._id)}
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.15)
                      : alpha(theme.palette.primary.main, 0.1),
                    border: theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.05)'
                      : 'none',
                    mr: 1,
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.primary.main, 0.25)
                        : alpha(theme.palette.primary.main, 0.2),
                    }
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton
                  color="error"
                  onClick={() => onDelete(activity._id)}
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.error.main, 0.15)
                      : alpha(theme.palette.error.main, 0.1),
                    border: theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.05)'
                      : 'none',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.error.main, 0.25)
                        : alpha(theme.palette.error.main, 0.2),
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Tooltip title="Save for later" arrow>
              <IconButton
                color="secondary"
                sx={{
                  backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.secondary.main, 0.15)
                    : alpha(theme.palette.secondary.main, 0.1),
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.05)'
                    : 'none',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.secondary.main, 0.25)
                      : alpha(theme.palette.secondary.main, 0.2),
                  }
                }}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      </Card>
    </Zoom>
  );
};

export default ActivityCard;
