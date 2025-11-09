// File: src/api/customerApi.js
import axiosClient from './axiosClient';

const customerApi = {
  getPods: (params) => {
    return axiosClient.get('/customer/pods', { params });
  },
  
  createBooking: (bookingData) => {
    return axiosClient.post('/customer/bookings', bookingData);
  },
  
  getProfile: () => {
    return axiosClient.get('/customer/profile');
  },

  getBookingHistory: (params) => {
    return axiosClient.get('/customer/bookings', { params });
  },
};

export default customerApi;