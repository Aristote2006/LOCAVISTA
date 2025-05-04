import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Checking authentication status...');

        if (!token) {
          console.log('No token found in localStorage');
          setLoading(false);
          return;
        }

        console.log('Token found in localStorage');

        try {
          // Check if token is valid and not expired
          const decoded = jwtDecode(token);
          console.log('Token decoded successfully:', decoded);

          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            // Token expired, remove from storage
            console.log('Token is expired, removing from localStorage');
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
            return;
          }
        } catch (tokenError) {
          // Invalid token format
          console.error('Invalid token format:', tokenError);
          localStorage.removeItem('token');
          setUser(null);
          setLoading(false);
          return;
        }

        console.log('Token is valid, fetching user data');

        // Token is valid, get user data
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get('/api/auth/me');

        console.log('User data API response:', response.data);

        // Check if response has the expected structure
        if (!response.data || !response.data.success) {
          console.error('Invalid response format from /api/auth/me:', response.data);
          throw new Error('Failed to get user data');
        }

        // Extract user data from response
        const userData = response.data.data;

        if (!userData) {
          console.error('No user data found in response:', response.data);
          throw new Error('User data missing from response');
        }

        console.log('User data retrieved successfully:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      console.log('Login API response:', response.data);

      // Check if response has the expected structure
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Login failed');
      }

      // Extract user data from response
      const userData = response.data.data;

      // Check if token exists in the response
      if (!userData || !userData.token) {
        console.error('No token found in login response:', response.data);
        throw new Error('Authentication token missing from response');
      }

      // Validate token before saving
      try {
        // Verify token is valid by decoding it
        const decoded = jwtDecode(userData.token);
        console.log('Login token decoded successfully:', decoded);

        // Save token to local storage
        localStorage.setItem('token', userData.token);
        console.log('Token saved to localStorage:', userData.token);

        // Set auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        // Set user
        setUser(userData);
        console.log('User logged in successfully:', userData);
      } catch (tokenError) {
        console.error('Invalid token received during login:', tokenError);
        throw new Error('Invalid authentication token received');
      }

      return {
        success: true,
        user: userData
      };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/api/auth/register', {
        name,
        email,
        password,
      });
      console.log('Register API response:', response.data);

      // Check if response has the expected structure
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Registration failed');
      }

      // Extract user data from response
      const userData = response.data.data;

      // Check if token exists in the response
      if (!userData || !userData.token) {
        console.error('No token found in registration response:', response.data);
        throw new Error('Authentication token missing from response');
      }

      // Validate token before saving
      try {
        // Verify token is valid by decoding it
        const decoded = jwtDecode(userData.token);
        console.log('Registration token decoded successfully:', decoded);

        // Save token to local storage
        localStorage.setItem('token', userData.token);
        console.log('Token saved to localStorage after registration:', userData.token);

        // Set auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        // Set user
        setUser(userData);
        console.log('User registered successfully:', userData);
      } catch (tokenError) {
        console.error('Invalid token received during registration:', tokenError);
        throw new Error('Invalid authentication token received');
      }

      return {
        success: true,
        user: userData
      };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Registration failed',
      };
    }
  };

  // Register admin
  const registerAdmin = async (name, email, password) => {
    try {
      const response = await api.post('/api/auth/register-admin', {
        name,
        email,
        password,
      });
      console.log('Admin Register API response:', response.data);

      // Check if response has the expected structure
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Admin registration failed');
      }

      // Extract user data from response
      const userData = response.data.data;

      // Check if token exists in the response
      if (!userData || !userData.token) {
        console.error('No token found in admin registration response:', response.data);
        throw new Error('Authentication token missing from response');
      }

      // Validate token before saving
      try {
        // Verify token is valid by decoding it
        const decoded = jwtDecode(userData.token);
        console.log('Admin registration token decoded successfully:', decoded);

        // Save token to local storage
        localStorage.setItem('token', userData.token);
        console.log('Token saved to localStorage after admin registration:', userData.token);

        // Set auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        // Set user
        setUser(userData);
        console.log('Admin registered successfully:', userData);
      } catch (tokenError) {
        console.error('Invalid token received during admin registration:', tokenError);
        throw new Error('Invalid authentication token received');
      }

      return {
        success: true,
        user: userData
      };
    } catch (error) {
      console.error('Admin registration error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Admin registration failed',
      };
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');

    // Remove auth header
    delete api.defaults.headers.common['Authorization'];

    // Clear user
    setUser(null);
    console.log('User logged out successfully');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const { data } = await api.put('/api/users/profile', userData);

      // Update user state
      setUser((prev) => ({ ...prev, ...data }));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        registerAdmin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
