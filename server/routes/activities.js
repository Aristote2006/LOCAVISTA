const express = require('express');
const { check } = require('express-validator');
const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activityController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateRequest } = require('../utils/validation');

const router = express.Router();

// Get all activities
router.get('/', getActivities);

// Get single activity
router.get('/:id', getActivity);

// Create activity - admin only
router.post(
  '/',
  protect,
  admin,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('latitude', 'Latitude is required').not().isEmpty(),
    check('longitude', 'Longitude is required').not().isEmpty(),
    check('images', 'At least one image is required').isArray({ min: 1, max: 3 }),
    check('description', 'Description is required and cannot exceed 250 characters')
      .not()
      .isEmpty()
      .isLength({ max: 250 }),
  ],
  validateRequest,
  createActivity
);

// Update activity - admin only
router.put(
  '/:id',
  protect,
  admin,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('description', 'Description is required and cannot exceed 250 characters')
      .not()
      .isEmpty()
      .isLength({ max: 250 }),
  ],
  validateRequest,
  updateActivity
);

// Delete activity - admin only
router.delete('/:id', protect, admin, deleteActivity);

// Upload activity images
router.post('/upload', protect, admin, upload.array('images', 3), (req, res) => {
  try {
    const imageUrls = req.files.map(file => {
      // Generate a timestamp for cache busting
      const timestamp = new Date().getTime();

      // For local development, create URLs that point to our server with cache busting
      return `${req.protocol}://${req.get('host')}/uploads/${file.filename}?v=${timestamp}`;
    });

    console.log('Server generated image URLs:', imageUrls);
    res.json({ success: true, urls: imageUrls });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

module.exports = router;
