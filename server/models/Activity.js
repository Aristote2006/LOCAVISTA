const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please provide an activity type'],
      enum: [
        'hotel',
        'resort',
        'restaurant',
        'saloon',
        'clinic',
        'hospital',
        'motel',
        'lodge',
        'adventure',
        'park',
        'museum',
        'other'
      ],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
        // [longitude, latitude]
      },
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one image'],
      validate: {
        validator: function(v) {
          return v.length > 0 && v.length <= 3;
        },
        message: 'Please provide 1-3 images'
      }
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [250, 'Description cannot be more than 250 characters'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Create geospatial index for location field
ActivitySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Activity', ActivitySchema);
