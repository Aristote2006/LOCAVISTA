const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connection URI
const uri = process.env.MONGO_URI;

console.log('Testing MongoDB connection...');
console.log(`Connection string (masked): ${uri.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, (_, srv, username) => `mongodb${srv || ''}://${username}:****@`)}`);

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
})
.then(() => {
  console.log('✅ MongoDB connection successful!');
  console.log(`Connected to: ${mongoose.connection.host}`);
  console.log(`Database name: ${mongoose.connection.name}`);
  
  // Close the connection
  return mongoose.disconnect();
})
.then(() => {
  console.log('Connection closed successfully');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  
  if (err.name === 'MongoServerSelectionError') {
    console.error('\nThis could be due to:');
    console.error('1. Network connectivity issues');
    console.error('2. MongoDB Atlas IP whitelist restrictions');
    console.error('3. Incorrect connection string');
    
    // Check if it's an IP whitelist issue
    if (err.message.includes('whitelist')) {
      console.error('\nIMPORTANT: This appears to be an IP whitelist issue.');
      console.error('Please add your current IP address to the MongoDB Atlas IP whitelist:');
      console.error('1. Log in to MongoDB Atlas');
      console.error('2. Go to Network Access');
      console.error('3. Click "Add IP Address"');
      console.error('4. Add your current IP or use "Allow Access from Anywhere" (0.0.0.0/0)');
      console.error('5. Click "Confirm"');
    }
  }
  
  process.exit(1);
});
