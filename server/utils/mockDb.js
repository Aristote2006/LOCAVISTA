/**
 * Mock database service for development when MongoDB is not available
 * This provides in-memory storage for basic CRUD operations
 */

// In-memory storage
const store = {
  users: [],
  activities: [],
};

// Generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Mock User model
const User = {
  findOne: async (query) => {
    if (query.email) {
      return store.users.find(user => user.email === query.email) || null;
    }
    return null;
  },
  findById: async (id) => {
    return store.users.find(user => user._id === id) || null;
  },
  create: async (userData) => {
    const newUser = {
      _id: generateId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.users.push(newUser);
    return newUser;
  },
  findByIdAndUpdate: async (id, updateData, options) => {
    const userIndex = store.users.findIndex(user => user._id === id);
    if (userIndex === -1) return null;
    
    const updatedUser = {
      ...store.users[userIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    
    store.users[userIndex] = updatedUser;
    return updatedUser;
  },
};

// Mock Activity model
const Activity = {
  find: async (query) => {
    let results = [...store.activities];
    
    // Filter by type
    if (query.type) {
      results = results.filter(activity => activity.type === query.type);
    }
    
    // Filter by featured
    if (query.featured) {
      results = results.filter(activity => activity.featured === query.featured);
    }
    
    // Add populate method to the results array
    results.populate = () => results;
    
    return results;
  },
  findById: async (id) => {
    const activity = store.activities.find(activity => activity._id === id) || null;
    if (activity) {
      // Add populate method to the activity
      activity.populate = () => activity;
    }
    return activity;
  },
  create: async (activityData) => {
    const newActivity = {
      _id: generateId(),
      ...activityData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.activities.push(newActivity);
    return newActivity;
  },
  findByIdAndUpdate: async (id, updateData, options) => {
    const activityIndex = store.activities.findIndex(activity => activity._id === id);
    if (activityIndex === -1) return null;
    
    const updatedActivity = {
      ...store.activities[activityIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    
    store.activities[activityIndex] = updatedActivity;
    return updatedActivity;
  },
};

// Add some initial data
const initMockData = () => {
  // Add admin user
  if (store.users.length === 0) {
    store.users.push({
      _id: 'admin123',
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2a$10$eCjlzwxJZZGXlvGB5.4Xr.Y1QVl.Ym1QKvhkZ5oDuLlTbRyEYLAEu', // hashed 'password123'
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    console.log('Mock database initialized with admin user:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
  }
};

// Initialize mock data
initMockData();

module.exports = {
  User,
  Activity,
  store,
};
