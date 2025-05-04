const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas
 * @returns {Promise} Mongoose connection promise
 */
const connectDB = async () => {
  try {
    // Mask password in connection string for logging
    const maskedUri = process.env.MONGO_URI.replace(
      /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
      (_, srv, username) => `mongodb${srv || ''}://${username}:****@`
    );
    console.log(`Attempting to connect to MongoDB Atlas: ${maskedUri}`);

    // Set mongoose options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increased timeout for Atlas
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      ssl: true,
      authSource: 'admin',
    };

    console.log('Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(process.env.MONGO_URI, options);

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB Atlas: ${error.message}`);

    // Provide more helpful error messages based on common issues
    if (error.name === 'MongoServerSelectionError') {
      console.error('\nCould not select a MongoDB server. This could be due to:');
      console.error('1. Network connectivity issues');
      console.error('2. MongoDB Atlas IP whitelist restrictions');
      console.error('3. Incorrect connection string');

      // Check if it's an IP whitelist issue
      if (error.message.includes('whitelist')) {
        console.error('\n⚠️ IMPORTANT: This appears to be an IP whitelist issue.');
        console.error('Please add your current IP address to the MongoDB Atlas IP whitelist:');
        console.error('1. Log in to MongoDB Atlas');
        console.error('2. Go to Network Access');
        console.error('3. Click "Add IP Address"');
        console.error('4. Add your current IP or use "Allow Access from Anywhere" (0.0.0.0/0)');
        console.error('5. Click "Confirm"');
      }
    }

    // Don't exit the process in development mode
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.error('\nApplication continuing despite MongoDB connection failure');
      console.error('⚠️ Database features will not work properly');

      // Return a dummy connection for development purposes
      return {
        connection: {
          host: 'none',
          name: 'mock-db',
          readyState: 0
        }
      };
    }
  }
};

module.exports = connectDB;
