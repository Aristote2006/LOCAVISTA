import api from './api';

// Upload profile image
export const uploadProfileImage = async (formData) => {
  try {
    const { data } = await api.post('/api/users/upload-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, url: data.url };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to upload profile image',
    };
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const { data } = await api.put('/api/users/profile', userData);
    return { success: true, data: data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile',
    };
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const { data } = await api.put('/api/users/password', passwordData);
    return { success: true, message: data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to change password',
    };
  }
};
