const express = require('express');
const { check } = require('express-validator');
const { updateProfile, changePassword } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateRequest } = require('../utils/validation');

const router = express.Router();

// Update user profile
router.put(
  '/profile',
  protect,
  [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
  ],
  validateRequest,
  updateProfile
);

// Change password
router.put(
  '/password',
  protect,
  [
    check('currentPassword', 'Current password is required').not().isEmpty(),
    check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
  ],
  validateRequest,
  changePassword
);

// Upload profile image
router.post('/upload-profile', protect, upload.single('image'), (req, res) => {
  try {
    // For local development, create URL that points to our server
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error('Profile image upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

module.exports = router;
