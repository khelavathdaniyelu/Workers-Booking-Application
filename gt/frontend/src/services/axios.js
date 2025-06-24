// src/services/axios.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Base URL for your API
  timeout: 5000,  // Optional: Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',  // Set the default content type to JSON
  },
});

// Optional: Add request interceptor to include authorization token if needed
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user')); // Get the user from localStorage
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;  // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for handling specific errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here like unauthorized access, etc.
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized errors
      console.error('Unauthorized access. Please log in again.');
      // You could redirect the user to the login page or logout them out
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
