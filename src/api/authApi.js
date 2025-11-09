// File: src/api/authApi.js
import axiosClient from './axiosClient';

const authApi = {
  register: (userData) => {
    return axiosClient.post('/auth/register', userData);
  },
  login: (credentials) => {
    return axiosClient.post('/auth/login', credentials);
  },
};

export default authApi;