import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('auth_token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Cars', 'Bookings', 'BlockedDates', 'PremiumCars'],
  endpoints: (builder) => ({
    // Cars
    getCars: builder.query({ query: () => '/cars', providesTags: ['Cars'] }),
    getCar: builder.query({ query: (id) => `/cars/${id}`, providesTags: (result, error, id) => [{ type: 'Cars', id }] }),
    getAvailableCars: builder.query({ query: () => '/cars/available', providesTags: ['Cars'] }),
    createCar: builder.mutation({ query: (body) => ({ url: '/cars', method: 'POST', body }), invalidatesTags: ['Cars'] }),
    updateCar: builder.mutation({ query: ({ id, ...body }) => ({ url: `/cars/${id}`, method: 'PUT', body }), invalidatesTags: ['Cars'] }),
    deleteCar: builder.mutation({ query: (id) => ({ url: `/cars/${id}`, method: 'DELETE' }), invalidatesTags: ['Cars'] }),

    // Bookings
    getBookings: builder.query({ query: () => '/bookings', providesTags: ['Bookings'] }),
    createBooking: builder.mutation({ query: (body) => ({ url: '/bookings', method: 'POST', body }), invalidatesTags: ['Bookings'] }),
    updateBookingStatus: builder.mutation({ query: ({ id, status }) => ({ url: `/bookings/${id}/status`, method: 'PATCH', body: { status } }), invalidatesTags: ['Bookings'] }),

    // Contact
    sendContact: builder.mutation({ query: (body) => ({ url: '/contact', method: 'POST', body }) }),

    // Premium Cars
    getPremiumCars: builder.query({ query: () => '/premium-cars', providesTags: ['PremiumCars'] }),
    createPremiumCar: builder.mutation({ query: (body) => ({ url: '/premium-cars', method: 'POST', body }), invalidatesTags: ['PremiumCars'] }),
    deletePremiumCar: builder.mutation({ query: (id) => ({ url: `/premium-cars/${id}`, method: 'DELETE' }), invalidatesTags: ['PremiumCars'] }),

    // Blocked Dates
    getBlockedDates: builder.query({ query: () => '/blocked-dates', providesTags: ['BlockedDates'] }),
    getBlockedDatesForCar: builder.query({ query: (carId) => `/blocked-dates/car/${carId}`, providesTags: (result, error, carId) => [{ type: 'BlockedDates', id: carId }] }),
    blockDate: builder.mutation({ query: (body) => ({ url: '/blocked-dates', method: 'POST', body }), invalidatesTags: ['BlockedDates'] }),
    unblockDate: builder.mutation({ query: (id) => ({ url: `/blocked-dates/${id}`, method: 'DELETE' }), invalidatesTags: ['BlockedDates'] }),
  }),
});

export const {
  useGetCarsQuery, useGetCarQuery, useGetAvailableCarsQuery,
  useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation,
  useGetBookingsQuery, useCreateBookingMutation, useUpdateBookingStatusMutation,
  useSendContactMutation,
  useGetPremiumCarsQuery, useCreatePremiumCarMutation, useDeletePremiumCarMutation,
  useGetBlockedDatesQuery, useGetBlockedDatesForCarQuery, useBlockDateMutation, useUnblockDateMutation,
} = apiSlice;
