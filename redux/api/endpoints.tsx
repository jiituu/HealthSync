import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const endpointsApiFunc = createApi({
  reducerPath: 'endpointsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://healthsync-backend-bfrv.onrender.com/api",
    prepareHeaders: (headers) => {
        // we might chage how the token is handled in the future. using local storage for now
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', `application/json`);
      return headers;
    },
    credentials: 'include', 
  }),

  tagTypes: [],
  endpoints: (builder) => ({
    getDoctors: builder.query<any, void>({
      query: () => ({
        url: '/doctors',
        method: 'GET',
      }),
    }),

    addDoctor: builder.mutation<any, any>({
      query: (doctor) => ({
        url: '/doctors',
        method: 'POST',
        body: doctor
      }),
    }),

  }),
});

export const {useGetDoctorsQuery, useAddDoctorMutation} = endpointsApiFunc;
