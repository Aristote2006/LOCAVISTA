import api from './api';

// Get all activities
export const getActivities = async (filters = {}) => {
  try {
    const { data } = await api.get('/api/activities', { params: filters });
    return { success: true, data: data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch activities',
    };
  }
};

// Get activity by ID
export const getActivityById = async (id) => {
  try {
    const { data } = await api.get(`/api/activities/${id}`);
    return { success: true, data: data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch activity',
    };
  }
};

// Create new activity
export const createActivity = async (activityData) => {
  try {
    const { data } = await api.post('/api/activities', activityData);

    // The activity is successfully created and returned from the server
    // We'll handle adding it to the context in the component that calls this function
    return { success: true, data: data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create activity',
    };
  }
};

// Update activity
export const updateActivity = async (id, activityData) => {
  try {
    const { data } = await api.put(`/api/activities/${id}`, activityData);
    return { success: true, data: data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update activity',
    };
  }
};

// Delete activity
export const deleteActivity = async (id) => {
  try {
    await api.delete(`/api/activities/${id}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete activity',
    };
  }
};

// Upload activity images
export const uploadImages = async (formData) => {
  try {
    const { data } = await api.post('/api/activities/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Ensure we have absolute URLs with cache-busting parameters
    const processedUrls = data.urls.map(url => {
      // Check if URL is relative (doesn't start with http or https)
      if (!url.startsWith('http')) {
        // Get the base URL from the current window location
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        url = `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
      }

      // Add cache-busting parameter
      const cacheBuster = `v=${new Date().getTime()}`;
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}${cacheBuster}`;
    });

    console.log('Processed image URLs:', processedUrls);
    return { success: true, urls: processedUrls };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to upload images',
    };
  }
};
