import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Send as SendIcon,
  AccessTime as TimeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout/Layout';

const ContactPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  // Office locations
  const officeLocations = [
    {
      city: 'New York',
      address: '123 Tourism Street, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'newyork@locavista.com',
      hours: 'Mon-Fri: 9AM-6PM',
    },
    {
      city: 'London',
      address: '45 Explorer Avenue, London EC1A 1BB',
      phone: '+44 20 1234 5678',
      email: 'london@locavista.com',
      hours: 'Mon-Fri: 9AM-6PM',
    },
    {
      city: 'Tokyo',
      address: '7-1 Travel Building, Shibuya, Tokyo',
      phone: '+81 3 1234 5678',
      email: 'tokyo@locavista.com',
      hours: 'Mon-Fri: 9AM-6PM',
    },
  ];

  // Contact form subjects
  const subjects = [
    'General Inquiry',
    'Partnership Opportunity',
    'Technical Support',
    'Feedback',
    'Report an Issue',
    'Press Inquiry',
    'Other',
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
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
            Get in Touch
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
            We'd love to hear from you. Reach out with questions, feedback, or partnership opportunities.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box>
              <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Have questions or feedback? We're here to help. Reach out to us through any of the channels below.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Email Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a
                        href="mailto:info@locavista.com"
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          borderBottom: `1px dashed ${theme.palette.primary.main}`,
                        }}
                      >
                        info@locavista.com
                      </a>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      We typically respond within 24 hours
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Call Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a
                        href="tel:+15551234567"
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          borderBottom: `1px dashed ${theme.palette.primary.main}`,
                        }}
                      >
                        +1 (555) 123-4567
                      </a>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Monday to Friday, 9AM-6PM EST
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <LocationIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Headquarters
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      123 Tourism Street
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Adventure City, AC 12345
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" fontWeight={600} gutterBottom>
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {[
                  { icon: <FacebookIcon />, color: '#1877F2', name: 'Facebook' },
                  { icon: <TwitterIcon />, color: '#1DA1F2', name: 'Twitter' },
                  { icon: <InstagramIcon />, color: '#E4405F', name: 'Instagram' },
                  { icon: <LinkedInIcon />, color: '#0A66C2', name: 'LinkedIn' },
                ].map((social, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    aria-label={social.name}
                    sx={{
                      minWidth: 'auto',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      p: 0,
                      color: social.color,
                      borderColor: alpha(social.color, 0.5),
                      '&:hover': {
                        borderColor: social.color,
                        backgroundColor: alpha(social.color, 0.1),
                      },
                    }}
                  >
                    {social.icon}
                  </Button>
                ))}
              </Box>

              <Box sx={{ mt: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Business Hours
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Monday - Friday:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight={500}>
                        9:00 AM - 6:00 PM
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Saturday:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight={500}>
                        10:00 AM - 4:00 PM
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Sunday:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight={500}>
                        Closed
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                height: '100%',
              }}
            >
              <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                Send Us a Message
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>

              {success && (
                <Alert
                  severity="success"
                  sx={{ mb: 3, borderRadius: 2 }}
                >
                  Your message has been sent successfully! We'll get back to you soon.
                </Alert>
              )}

              {error && (
                <Alert
                  severity="error"
                  sx={{ mb: 3, borderRadius: 2 }}
                >
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      select
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={loading}
                    >
                      {subjects.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={6}
                      variant="outlined"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: '50px',
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Office Locations */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
            Our Offices
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Visit us at one of our global offices. We'd love to meet you in person.
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {officeLocations.map((office, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    height: '100%',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                    }
                  }}
                >
                  <Typography variant="h5" component="h3" fontWeight={700} gutterBottom>
                    {office.city}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <LocationIcon sx={{ color: theme.palette.primary.main, mr: 1.5, mt: 0.3 }} />
                    <Typography variant="body2" color="text.secondary">
                      {office.address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {office.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {office.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimeIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {office.hours}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Map */}
        <Box sx={{ mt: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 0,
              borderRadius: 4,
              overflow: 'hidden',
              height: 450,
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941512199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619826381244!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="LocaVista Office Location"
            ></iframe>
          </Paper>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Find quick answers to common questions about LocaVista.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              {
                question: 'How do I create an account?',
                answer: 'You can create an account by clicking the "Register" button in the top right corner of the page. Follow the prompts to set up your profile.',
              },
              {
                question: 'Is LocaVista available in my country?',
                answer: 'LocaVista is currently available in over 50 countries worldwide. Check our coverage page for a complete list of supported regions.',
              },
              {
                question: 'How can I list my business on LocaVista?',
                answer: 'Business owners can register and submit their listings through our Partner Portal. All submissions are reviewed before being published.',
              },
              {
                question: 'Are there any fees to use LocaVista?',
                answer: 'Basic LocaVista accounts are free for travelers. We offer premium subscriptions with additional features for frequent travelers.',
              },
            ].map((faq, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    height: '100%',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <Typography variant="h6" component="h3" fontWeight={700} gutterBottom>
                    {faq.question}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default ContactPage;
