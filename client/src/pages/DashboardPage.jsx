import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Button,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Star as StarIcon,
  Hotel as HotelIcon,
  Restaurant as RestaurantIcon,
  LocalHospital as HospitalIcon,
  Park as ParkIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { getActivities } from '../services/activityService';
import AdminLayout from '../components/Layout/AdminLayout';

const DashboardPage = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    byType: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user data for analytics
  const [userData] = useState({
    total: 2458,
    growth: 12.5,
    newToday: 38,
    active: 1872
  });

  // Mock activity views data
  const [viewsData] = useState({
    total: 12540,
    today: 342,
    growth: 8.7,
    popular: [
      { name: 'Central Park', views: 1245, rating: 4.8, type: 'Park' },
      { name: 'Art Museum', views: 1120, rating: 4.7, type: 'Museum' },
      { name: 'Seafood Paradise', views: 980, rating: 4.9, type: 'Restaurant' },
      { name: 'City Zoo', views: 870, rating: 4.6, type: 'Attraction' },
      { name: 'Shopping Mall', views: 760, rating: 4.5, type: 'Shopping' }
    ]
  });

  // Mock recent activities
  const [recentActivities] = useState([
    { type: 'New User', user: 'John Doe', time: '5 minutes ago', action: 'registered an account' },
    { type: 'New Activity', user: 'Admin', time: '1 hour ago', action: 'added "Central Park Museum"' },
    { type: 'Review', user: 'Sarah Johnson', time: '3 hours ago', action: 'left a 5-star review on "Seafood Paradise"' },
    { type: 'Update', user: 'Admin', time: '1 day ago', action: 'updated details for "City Zoo"' },
    { type: 'Delete', user: 'Admin', time: '2 days ago', action: 'removed "Closed Coffee Shop"' }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await getActivities();

        if (result.success) {
          const activities = result.data;

          // Calculate stats
          const featured = activities.filter(a => a.featured).length;

          // Count by type
          const byType = activities.reduce((acc, activity) => {
            acc[activity.type] = (acc[activity.type] || 0) + 1;
            return acc;
          }, {});

          setStats({
            total: activities.length,
            featured,
            byType,
          });
        } else {
          setError('Failed to fetch activities');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Handle refresh analytics
  const handleRefreshAnalytics = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Get icon for activity type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'hotel':
      case 'motel':
      case 'lodge':
      case 'resort':
        return <HotelIcon />;
      case 'restaurant':
      case 'saloon':
        return <RestaurantIcon />;
      case 'clinic':
      case 'hospital':
        return <HospitalIcon />;
      case 'adventure':
      case 'park':
      case 'museum':
        return <ParkIcon />;
      default:
        return <LocationIcon />;
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Dashboard Header */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 4
        }}>
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1E88E5, #4CAF50)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <DashboardIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
              Admin Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage activities, view analytics, and monitor system performance
            </Typography>
          </Box>

          <Tooltip title="Refresh Analytics">
            <IconButton
              onClick={handleRefreshAnalytics}
              disabled={refreshing}
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <RefreshIcon
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
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 6, flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Loading dashboard data...
            </Typography>
          </Box>
        ) : (
          <>
            {/* Dashboard Tabs */}
            <Box sx={{ mb: 4 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  mb: 3,
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    minWidth: 'auto',
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    borderRadius: '8px 8px 0 0',
                    mr: 1,
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }
                }}
              >
                <Tab label="Overview" icon={<DashboardIcon />} iconPosition="start" />
                <Tab label="Activities" icon={<LocationIcon />} iconPosition="start" />
                <Tab label="Analytics" icon={<TrendingUpIcon />} iconPosition="start" />
                <Tab label="Recent Activity" icon={<AccessTimeIcon />} iconPosition="start" />
              </Tabs>

              {/* Overview Tab Content */}
              {activeTab === 0 && (
                <>
                  {/* Stats Cards */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Total Activities Card */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          height: '100%',
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)}, ${alpha(theme.palette.primary.main, 0.1)})`,
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Total Activities
                          </Typography>
                          <LocationIcon color="primary" />
                        </Box>

                        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                          {stats.total}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Featured
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {stats.featured}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Types
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {Object.keys(stats.byType).length}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Views
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {userData.total.toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Users Card */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          height: '100%',
                          background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.2)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                          border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Total Users
                          </Typography>
                          <PeopleIcon color="secondary" />
                        </Box>

                        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                          {userData.total.toLocaleString()}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: alpha(theme.palette.success.main, 0.1),
                              color: theme.palette.success.main,
                              px: 1,
                              py: 0.5,
                              borderRadius: 5,
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            <TrendingUpIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                            {userData.growth}%
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            from last month
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              New Today
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {userData.newToday}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Active Users
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {userData.active}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Popular Activities Card */}
                    <Grid item xs={12} md={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          height: '100%',
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Popular Activities
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: alpha(theme.palette.warning.main, 0.1),
                              color: theme.palette.warning.main,
                              px: 1,
                              py: 0.5,
                              borderRadius: 5,
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            <VisibilityIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                            {viewsData.total.toLocaleString()} views
                          </Box>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {viewsData.popular.slice(0, 3).map((activity, index) => (
                          <Box key={activity.name} sx={{ mb: index < 2 ? 2 : 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    mr: 1,
                                    bgcolor: index === 0
                                      ? '#FFD700'
                                      : index === 1
                                        ? '#C0C0C0'
                                        : '#CD7F32',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {index + 1}
                                </Avatar>
                                <Typography variant="body2" fontWeight={600}>
                                  {activity.name}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <StarIcon sx={{ color: '#FFC107', fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2" fontWeight={600}>
                                  {activity.rating}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" color="text.secondary" sx={{ pl: 4 }}>
                                {activity.type}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {activity.views.toLocaleString()} views
                              </Typography>
                            </Box>
                            {index < 2 && <Divider sx={{ mt: 1.5 }} />}
                          </Box>
                        ))}
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Activities by Type */}
                  <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
                    Activities by Type
                  </Typography>
                  <Grid container spacing={3}>
                    {Object.entries(stats.byType)
                      .sort((a, b) => b[1] - a[1])
                      .map(([type, count]) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={type}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              display: 'flex',
                              alignItems: 'center',
                              height: '100%',
                              borderRadius: 3,
                              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                borderColor: alpha(theme.palette.primary.main, 0.3),
                              }
                            }}
                          >
                            <Avatar
                              sx={{
                                mr: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                              }}
                            >
                              {getTypeIcon(type)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                              >
                                {type}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Box sx={{ flex: 1, mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={(count / stats.total) * 100}
                                    sx={{
                                      height: 6,
                                      borderRadius: 3,
                                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                      '& .MuiLinearProgress-bar': {
                                        borderRadius: 3,
                                      }
                                    }}
                                  />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 45 }}>
                                  {count} {count === 1 ? 'item' : 'items'}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                  </Grid>

                  {/* Recent Activity */}
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
                      Recent Activity
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      }}
                    >
                      {recentActivities.map((activity, index) => (
                        <Box key={index}>
                          <Box sx={{ display: 'flex', py: 2 }}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (() => {
                                  switch(activity.type) {
                                    case 'New User': return alpha(theme.palette.info.main, 0.1);
                                    case 'New Activity': return alpha(theme.palette.success.main, 0.1);
                                    case 'Review': return alpha(theme.palette.warning.main, 0.1);
                                    case 'Update': return alpha(theme.palette.primary.main, 0.1);
                                    case 'Delete': return alpha(theme.palette.error.main, 0.1);
                                    default: return alpha(theme.palette.grey[500], 0.1);
                                  }
                                })(),
                                color: (() => {
                                  switch(activity.type) {
                                    case 'New User': return theme.palette.info.main;
                                    case 'New Activity': return theme.palette.success.main;
                                    case 'Review': return theme.palette.warning.main;
                                    case 'Update': return theme.palette.primary.main;
                                    case 'Delete': return theme.palette.error.main;
                                    default: return theme.palette.grey[500];
                                  }
                                })(),
                                mr: 2
                              }}
                            >
                              {(() => {
                                switch(activity.type) {
                                  case 'New User': return <PeopleIcon fontSize="small" />;
                                  case 'New Activity': return <LocationIcon fontSize="small" />;
                                  case 'Review': return <StarIcon fontSize="small" />;
                                  case 'Update': return <RefreshIcon fontSize="small" />;
                                  case 'Delete': return <MoreVertIcon fontSize="small" />;
                                  default: return <MoreVertIcon fontSize="small" />;
                                }
                              })()}
                            </Box>

                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" fontWeight={600}>
                                  {activity.user}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {activity.time}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {activity.action}
                              </Typography>
                            </Box>
                          </Box>
                          {index < recentActivities.length - 1 && (
                            <Divider />
                          )}
                        </Box>
                      ))}

                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600
                          }}
                        >
                          View All Activity
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                </>
              )}

              {/* Activities Tab Content */}
              {activeTab === 1 && (
                <Typography variant="body1">
                  Activities management content will go here
                </Typography>
              )}

              {/* Analytics Tab Content */}
              {activeTab === 2 && (
                <Typography variant="body1">
                  Detailed analytics content will go here
                </Typography>
              )}

              {/* Recent Activity Tab Content */}
              {activeTab === 3 && (
                <Typography variant="body1">
                  Full activity log will go here
                </Typography>
              )}
            </Box>
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default DashboardPage;
