import axios from 'axios';

export const baseURL = "http://localhost:3000"
// export const baseURL = "https://www.capitalgates.ae" 



const api = axios.create({
  baseURL:`${baseURL}/api`,// Base URL for all API calls
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response
api.interceptors.request.use(
  (config) => {
    // Add token or custom headers if required
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      const parsedData = JSON.parse(adminUser);
      config.headers.Authorization = `Bearer ${parsedData.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally if required
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
