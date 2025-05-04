# LocaVista Frontend

This is the frontend for the LocaVista application, built with React, Material UI, and Leaflet.

## Features

- User authentication (login/register)
- Admin dashboard for managing activities
- User-facing home page with geolocation-based activity discovery
- Map view with activity markers
- Responsive design for all screen sizes

## Pages

- **Home** - Main page showing nearby and featured activities
- **Login/Register** - Authentication pages
- **Dashboard** - Admin overview with statistics
- **Activities** - Admin page for managing activities
- **Add/Edit Activity** - Forms for creating and updating activities
- **Profile** - User profile management

## Components

- **Layout** - Page layout with navbar and optional sidebar
- **ActivityCard** - Card component for displaying activities
- **ActivityForm** - Form for adding/editing activities
- **Map** - Interactive map showing activity locations

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Project Structure

```
client/
├── public/         # Static files
└── src/            # React source code
    ├── components/ # Reusable components
    ├── pages/      # Page components
    ├── context/    # Context providers
    ├── hooks/      # Custom hooks
    ├── utils/      # Utility functions
    ├── services/   # API services
    └── assets/     # Images, icons, etc.
```
