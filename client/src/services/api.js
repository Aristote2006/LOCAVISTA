import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists and is valid
const token = localStorage.getItem('token');
if (token) {
  try {
    // Log token format for debugging (only first few characters)
    const tokenPreview = token.length > 10 ?
      `${token.substring(0, 10)}...` :
      token;
    console.log(`Token found in localStorage (preview): ${tokenPreview}`);

    // Check if token is a valid string
    if (typeof token !== 'string' || token.trim() === '') {
      console.error('Invalid token format: not a valid string');
      localStorage.removeItem('token');
    } else {
      try {
        // Verify token is valid
        const decoded = jwtDecode(token);
        console.log('Token decoded successfully:', decoded);

        const currentTime = Date.now() / 1000;

        // Check if token is expired
        if (decoded.exp < currentTime) {
          console.log('Token is expired, removing from localStorage');
          localStorage.removeItem('token');
        } else {
          // Token is valid, add to headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('Valid token found and added to API headers');
        }
      } catch (decodeError) {
        console.error('Failed to decode token:', decodeError);
        localStorage.removeItem('token');
      }
    }
  } catch (error) {
    console.error('Error processing token in localStorage:', error);
    localStorage.removeItem('token');
  }
}

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log(`API Response [${response.config.method.toUpperCase()} ${response.config.url}]:`, {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Handle API errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`API Error [${error.config?.method?.toUpperCase()} ${error.config?.url}]:`, {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });

      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        console.log('Unauthorized request detected, clearing token');
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];

        // Redirect to login page if needed
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          console.log('Redirecting to login page...');
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error: No response received', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error: Request setup failed', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
