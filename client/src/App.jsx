import { React } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { useAuth } from './hooks/useAuth'
import { NotificationsProvider } from './context/NotificationsContext'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ActivitiesPage from './pages/ActivitiesPage'
import AddActivityPage from './pages/AddActivityPage'
import EditActivityPage from './pages/EditActivityPage'
import ActivityDetailsPage from './pages/ActivityDetailsPage'
import ProfilePage from './pages/ProfilePage'
import NotificationsPage from './pages/NotificationsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ExplorePage from './pages/ExplorePage'
import NotFoundPage from './pages/NotFoundPage'

// Protected route component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'rgba(46, 125, 50, 0.05)'
        }}
      >
        <CircularProgress color="primary" size={60} thickness={4} />
        <Box sx={{ mt: 3, color: 'text.secondary' }}>
          Verifying authentication...
        </Box>
      </Box>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log('User not authenticated, redirecting to login page');
    return <Navigate to="/login" />
  }

  // Redirect to home if trying to access admin page without admin role
  if (adminOnly && user.role !== 'admin') {
    console.log('Non-admin user trying to access admin page, redirecting to homepage');
    return <Navigate to="/" />
  }

  // User is authenticated and authorized
  console.log(`User authenticated as ${user.role}, accessing protected route`);
  return children
}

function App() {
  return (
    <NotificationsProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/activities/details/:id" element={<ActivityDetailsPage />} />

      {/* Protected routes - Admin only */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute adminOnly>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities"
        element={
          <ProtectedRoute adminOnly>
            <ActivitiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities/add"
        element={
          <ProtectedRoute adminOnly>
            <AddActivityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities/edit/:id"
        element={
          <ProtectedRoute adminOnly>
            <EditActivityPage />
          </ProtectedRoute>
        }
      />

      {/* Protected routes - Any authenticated user */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Notifications route */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute adminOnly>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </NotificationsProvider>
  )
}

export default App
