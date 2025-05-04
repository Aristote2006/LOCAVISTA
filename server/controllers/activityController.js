const Activity = require('../models/Activity');
const { handleError } = require('../utils/errorHandler');

// Helper function to calculate distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// @desc    Create a new activity
// @route   POST /api/activities
// @access  Private (Admin only)
exports.createActivity = async (req, res) => {
  try {
    const {
      name,
      type,
      email,
      phone,
      latitude,
      longitude,
      images,
      description,
      featured,
    } = req.body;

    // Create new activity
    const activity = await Activity.create({
      name,
      type,
      email,
      phone,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      images,
      description,
      featured: featured || false,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
exports.getActivities = async (req, res) => {
  try {
    const { type, featured, lat, lng, radius = 50 } = req.query;

    let query = {};

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    let activities;

    // If location is provided, use geospatial query
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      // Convert radius from km to meters for MongoDB
      const radiusInMeters = parseFloat(radius) * 1000;

      activities = await Activity.find({
        ...query,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: radiusInMeters,
          },
        },
      }).populate('createdBy', 'name email');
    } else {
      // Regular query without location filtering
      activities = await Activity.find(query).populate('createdBy', 'name email');
    }

    res.json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private (Admin only)
exports.updateActivity = async (req, res) => {
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    const {
      name,
      type,
      email,
      phone,
      latitude,
      longitude,
      images,
      description,
      featured,
    } = req.body;

    const updateData = {
      name,
      type,
      email,
      phone,
      description,
      featured: featured || false,
    };

    // Update location if provided
    if (latitude && longitude) {
      updateData.location = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      };
    }

    // Update images if provided
    if (images && images.length > 0) {
      updateData.images = images;
    }

    activity = await Activity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private (Admin only)
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    await activity.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    handleError(error, res);
  }
};
