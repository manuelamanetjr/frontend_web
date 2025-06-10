import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:6000';

const api = axios.create({
  baseURL,

  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// TODO ayaw e remove😤 -MVA
// Optional: Add auth token if available 
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
