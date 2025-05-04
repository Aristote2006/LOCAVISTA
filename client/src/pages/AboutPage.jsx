import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Button,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Explore as ExploreIcon,
  History as HistoryIcon,
  Groups as TeamIcon,
  EmojiObjects as VisionIcon,
  Favorite as ValuesIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const AboutPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Team members data
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Sarah founded LocaVista with a passion for connecting travelers with authentic local experiences.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Michael leads our technology team, ensuring LocaVista delivers a seamless experience across all platforms.',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Partnerships',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      bio: 'Emma builds relationships with local businesses to bring unique experiences to our users.',
    },
    {
      name: 'David Wilson',
      role: 'Lead Designer',
      image: 'https://randomuser.me/api/portraits/men/68.jpg',
      bio: 'David crafts the visual experience of LocaVista, making exploration intuitive and enjoyable.',
    },
  ];

  // Company milestones
  const milestones = [
    {
      year: '2018',
      title: 'LocaVista Founded',
      description: 'Started with a simple idea: help travelers discover hidden gems in their own backyard.',
    },
    {
      year: '2019',
      title: 'First 10,000 Users',
      description: 'Reached our first major user milestone and expanded to 5 major cities.',
    },
    {
      year: '2020',
      title: 'Mobile App Launch',
      description: 'Launched our mobile app for iOS and Android, bringing local discoveries to your pocket.',
    },
    {
      year: '2021',
      title: 'Series A Funding',
      description: 'Secured $5M in funding to expand our team and improve our technology.',
    },
    {
      year: '2022',
      title: 'International Expansion',
      description: 'Expanded our services to 15 countries, helping travelers worldwide.',
    },
    {
      year: '2023',
      title: 'Community Milestone',
      description: 'Celebrated 1 million user-submitted reviews and recommendations.',
    },
  ];

  // Core values
  const coreValues = [
    {
      title: 'Authenticity',
      description: 'We believe in showcasing genuine local experiences, not tourist traps.',
      icon: <StarIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
    },
    {
      title: 'Community',
      description: 'We build connections between travelers and local communities.',
      icon: <TeamIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
    },
    {
      title: 'Sustainability',
      description: 'We promote responsible tourism that respects local environments and cultures.',
      icon: <CheckCircleIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
    },
    {
      title: 'Innovation',
      description: 'We constantly improve our platform to better serve travelers and local businesses.',
      icon: <VisionIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80)',
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
              Our Story
            </Typography>
          </Box>

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
            About LocaVista
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
            }}
          >
            Connecting travelers with authentic local experiences since 2018
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Tabs Navigation */}
        <Box sx={{ mb: 6 }}>
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
                fontSize: '1rem',
                borderRadius: '8px 8px 0 0',
                mr: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }
              }
            }}
          >
            <Tab label="Our Story" icon={<HistoryIcon />} iconPosition="start" />
            <Tab label="Our Team" icon={<TeamIcon />} iconPosition="start" />
            <Tab label="Our Values" icon={<ValuesIcon />} iconPosition="start" />
            <Tab label="Milestones" icon={<ExploreIcon />} iconPosition="start" />
          </Tabs>

          {/* Our Story Tab */}
          {activeTab === 0 && (
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                  Discover the World Around You
                </Typography>
                <Typography variant="body1" paragraph>
                  LocaVista was born from a simple observation: often, the most amazing experiences are right in our own backyard, yet we miss them. Our founder, Sarah Johnson, was traveling abroad when she realized she knew more about foreign destinations than her own hometown.
                </Typography>
                <Typography variant="body1" paragraph>
                  Upon returning, she set out to create a platform that would help people discover the hidden gems in their local areas. What started as a simple blog quickly grew into a comprehensive platform connecting travelers with authentic local experiences.
                </Typography>
                <Typography variant="body1" paragraph>
                  Today, LocaVista helps millions of users discover incredible activities, restaurants, landmarks, and more in over 150 cities worldwide. Our mission remains the same: to help you see the world around you with new eyes.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={RouterLink}
                    to="/explore"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Start Exploring
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '500px',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                    alt="Our Story"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      From Local Blog to Global Platform
                    </Typography>
                    <Typography variant="body2">
                      Our journey of connecting travelers with authentic experiences
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Our Team Tab */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                  Meet Our Team
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                  The passionate individuals behind LocaVista who work tirelessly to help you discover amazing experiences around the world.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {teamMembers.map((member, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        overflow: 'hidden',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          '& .member-image': {
                            transform: 'scale(1.05)',
                          }
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <Box
                          component="img"
                          src={member.image}
                          alt={member.name}
                          className="member-image"
                          sx={{
                            width: '100%',
                            height: 240,
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                          }}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="h6" component="h3" fontWeight={700} gutterBottom>
                          {member.name}
                        </Typography>
                        <Chip
                          label={member.role}
                          size="small"
                          color="primary"
                          sx={{ mb: 2, fontWeight: 500 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {member.bio}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Typography variant="h6" gutterBottom>
                  Want to Join Our Team?
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/careers"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    mt: 2,
                    borderRadius: '50px',
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderWidth: 2,
                  }}
                >
                  View Open Positions
                </Button>
              </Box>
            </Box>
          )}

          {/* Our Values Tab */}
          {activeTab === 2 && (
            <Box>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                  Our Core Values
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                  The principles that guide everything we do at LocaVista, from product development to customer service.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {coreValues.map((value, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        borderRadius: 4,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            mr: 3,
                          }}
                        >
                          {value.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h5" component="h3" fontWeight={700} gutterBottom>
                            {value.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {value.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 6, p: 4, borderRadius: 4, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <Typography variant="h5" component="h3" fontWeight={700} gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  To connect travelers with authentic local experiences, fostering cultural understanding and supporting local communities.
                </Typography>
                <Typography variant="h5" component="h3" fontWeight={700} gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body1">
                  A world where every traveler can experience the authentic heart of a destination, creating meaningful connections and memories that last a lifetime.
                </Typography>
              </Box>
            </Box>
          )}

          {/* Milestones Tab */}
          {activeTab === 3 && (
            <Box>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                  Our Journey
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                  Key milestones in LocaVista's growth from a small startup to a global platform.
                </Typography>
              </Box>

              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: 4,
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    transform: 'translateX(-50%)',
                    display: { xs: 'none', md: 'block' },
                  }}
                />

                {milestones.map((milestone, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                      mb: 6,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: '100%', md: '50%' },
                        pr: { xs: 0, md: index % 2 === 0 ? 6 : 0 },
                        pl: { xs: 0, md: index % 2 === 0 ? 0 : 6 },
                        textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 4,
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                          }
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="h3"
                          fontWeight={700}
                          gutterBottom
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {milestone.title}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {milestone.description}
                        </Typography>
                      </Paper>
                    </Box>

                    <Box
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        zIndex: 2,
                        boxShadow: '0 0 0 4px white, 0 0 0 8px rgba(76, 175, 80, 0.2)',
                      }}
                    >
                      {milestone.year}
                    </Box>

                    <Box
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        mb: 2,
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: theme.palette.primary.main,
                      }}
                    >
                      {milestone.year}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          py: 8,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" fontWeight={800} gutterBottom>
                Ready to Explore?
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                Join thousands of travelers discovering amazing local experiences every day. Start your journey with LocaVista today.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Sign Up Now
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/contact"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderWidth: 2,
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80"
                  alt="Explore with LocaVista"
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default AboutPage;
