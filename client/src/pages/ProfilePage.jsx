import { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { uploadProfileImage, changePassword as changeUserPassword } from '../services/userService';
import Layout from '../components/Layout/Layout';

const ProfilePage = () => {
  const theme = useTheme();
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profileImage: user?.profileImage || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle profile form input change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password form input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setImageUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 15);
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      // Upload image to server
      const result = await uploadProfileImage(formData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success) {
        // Update profile data with the new image URL
        setProfileData(prev => ({ ...prev, profileImage: result.url }));

        // Update profile with new image URL
        const updateResult = await updateProfile({ profileImage: result.url });

        if (updateResult.success) {
          toast.success('Profile image updated successfully');
        } else {
          toast.error(updateResult.message || 'Failed to update profile with new image');
        }
      } else {
        toast.error(result.message || 'Failed to upload profile image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('An error occurred while uploading the image');
    } finally {
      setImageUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      setProfileLoading(true);
      setProfileError('');

      const result = await updateProfile(profileData);

      if (result.success) {
        toast.success('Profile updated successfully');
      } else {
        setProfileError(result.message);
        toast.error(result.message);
      }
    } catch (error) {
      setProfileError('An error occurred while updating your profile');
      toast.error('An error occurred while updating your profile');
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordError('');

      const result = await changeUserPassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        toast.success('Password changed successfully');

        // Reset form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setPasswordError(result.message || 'Failed to change password');
        toast.error(result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Password change error:', error);
      setPasswordError('An error occurred while changing your password');
      toast.error('An error occurred while changing your password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Layout showSidebar={user?.role === 'admin'}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Profile Settings
        </Typography>

        <Paper sx={{ mt: 3, p: 0 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Profile Information" />
            <Tab label="Change Password" />
          </Tabs>

          <Divider />

          {/* Profile Information Tab */}
          {activeTab === 0 && (
            <Box sx={{ p: 3 }}>
              {profileError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {profileError}
                </Alert>
              )}

              <Grid container spacing={3}>
                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <Avatar
                      src={profileData.profileImage}
                      alt={profileData.name}
                      sx={{
                        width: 150,
                        height: 150,
                        border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.15)}`
                      }}
                    />

                    {/* Upload progress indicator */}
                    {imageUploading && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: alpha(theme.palette.background.paper, 0.7),
                          borderRadius: '50%',
                          zIndex: 1,
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={uploadProgress}
                          size={60}
                          thickness={4}
                          sx={{
                            color: theme.palette.primary.main,
                            '& .MuiCircularProgress-circle': {
                              strokeLinecap: 'round',
                            },
                          }}
                        />
                        <Typography
                          variant="caption"
                          component="div"
                          sx={{
                            position: 'absolute',
                            color: theme.palette.text.primary,
                            fontWeight: 'bold',
                          }}
                        >
                          {`${Math.round(uploadProgress)}%`}
                        </Typography>
                      </Box>
                    )}

                    {/* Edit button */}
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      onClick={triggerFileInput}
                      disabled={imageUploading}
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      <PhotoCameraIcon />
                    </IconButton>

                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleImageUpload}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    Click the camera icon to change your profile picture
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="center">
                    Supported formats: JPEG, PNG, GIF (max 5MB)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box component="form" onSubmit={handleProfileUpdate}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={profileLoading}
                            startIcon={profileLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                            sx={{
                              px: 3,
                              py: 1,
                              borderRadius: '8px',
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            {profileLoading ? 'Saving...' : 'Save Changes'}
                          </Button>

                          <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={() => setActiveTab(1)}
                            startIcon={<LockIcon />}
                            sx={{
                              px: 3,
                              py: 1,
                              borderRadius: '8px',
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            Change Password
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Change Password Tab */}
          {activeTab === 1 && (
            <Box sx={{ p: 3 }}>
              {passwordError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {passwordError}
                </Alert>
              )}

              <Box component="form" onSubmit={handlePasswordSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      helperText="Password must be at least 6 characters"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      error={
                        passwordData.confirmPassword &&
                        passwordData.newPassword !== passwordData.confirmPassword
                      }
                      helperText={
                        passwordData.confirmPassword &&
                        passwordData.newPassword !== passwordData.confirmPassword
                          ? 'Passwords do not match'
                          : ''
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={passwordLoading}
                        startIcon={passwordLoading ? <CircularProgress size={20} /> : <LockIcon />}
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        {passwordLoading ? 'Changing...' : 'Update Password'}
                      </Button>

                      <Button
                        type="button"
                        variant="outlined"
                        color="inherit"
                        onClick={() => {
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                          });
                          setPasswordError('');
                        }}
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Reset Form
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
