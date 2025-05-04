# LocaVista Backend

This is the backend server for the LocaVista application, built with Node.js, Express, and MongoDB.

## Features

- RESTful API for managing activities and users
- JWT authentication
- Geospatial queries for location-based searches
- File uploads for activity images and user profiles
- Role-based access control (user/admin)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/register-admin` - Register a new admin
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get single activity
- `POST /api/activities` - Create activity (admin only)
- `PUT /api/activities/:id` - Update activity (admin only)
- `DELETE /api/activities/:id` - Delete activity (admin only)
- `POST /api/activities/upload` - Upload activity images (admin only)

### Users
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Change password
- `POST /api/users/upload-profile` - Upload profile image

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

```
server/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── scripts/        # Helper scripts
├── uploads/        # Uploaded files
└── utils/          # Utility functions
```
