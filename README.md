# LocaVista

LocaVista is a location-aware platform that allows an admin to manage and showcase local businesses and attractions. The platform uses geolocation to show relevant activities to users based on their real-time location.

## Features

### Admin Dashboard
- Authentication (JWT)
- Manage activities (add, edit, delete)
- Upload images
- Mark activities as featured
- Profile management

### User-Facing Home Page
- Detect user's location
- Display nearby and featured activities
- Filter activities by type
- Search functionality
- Map view with activity pins

## Tech Stack

- **Frontend**: React.js, Material UI, Leaflet (maps)
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Image Storage**: Cloudinary

## Project Structure

```
locavista/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── context/        # Context providers
│       ├── hooks/          # Custom hooks
│       ├── utils/          # Utility functions
│       ├── services/       # API services
│       └── assets/         # Images, icons, etc.
└── server/                 # Node.js backend
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    └── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image storage)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/locavista.git
   cd locavista
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Install client dependencies
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Running the Application

1. Start the server
   ```
   cd server
   npm run dev
   ```

2. Start the client
   ```
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Creating an Admin User

To create an admin user, send a POST request to `/api/auth/register-admin` with the following body:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123"
}
```

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

## License

This project is licensed under the MIT License.
