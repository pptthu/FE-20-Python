// File: src/api/staffApi.js

import axiosClient from './axiosClient'; 

const staffApi = {
 
    getDailyBookings: () => {
        const url = '/staff/bookings/daily'; 
        return axiosClient.get(url);
    },

    // Hàm để check-in
    checkIn: (bookingId) => {
        const url = `/staff/bookings/${bookingId}/check-in`;
        return axiosClient.put(url); 
    },

    // Hàm để check-out
    checkOut: (bookingId) => {
        const url = `/staff/bookings/${bookingId}/check-out`;
        return axiosClient.put(url);
    }
};

export default staffApi;