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
    return { success: true, urls: data.urls };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to upload images',
    };
  }
};
