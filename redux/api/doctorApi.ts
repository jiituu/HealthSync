import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DoctorLoginPayload, DoctorSignupPayload } from "@/types/doctor";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://healthsync-backend-bfrv.onrender.com/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
      return headers;
    },
  }),
  tagTypes: ["Doctor"], 
  endpoints: (builder) => ({

    // Doctor login
    loginDoctor: builder.mutation<any, DoctorLoginPayload>({
      query: (doctor) => ({
        url: '/login/doctor',
        method: 'POST',
        body: doctor,
      }),
      invalidatesTags: ["Doctor"], 
    }),

    // Doctor registration
    registerDoctor: builder.mutation<any, DoctorSignupPayload>({
      query: (doctor) => ({
        url: '/register/doctor',
        method: 'POST',
        body: doctor,
      }),
      invalidatesTags: ["Doctor"], 
    }),

    // Get all doctors
    getDoctors: builder.query<any, void>({
      query: () => ({
        url: '/doctors',
        method: 'GET',
      }),
      providesTags: ["Doctor"], 
    }),

    // Delete a doctor
    deleteDoctor: builder.mutation<void, void>({
      query: () => ({
        url: '/doctors/me',
        method: 'DELETE',
      }),
      invalidatesTags: ["Doctor"],
    }),

    // Get doctor by ID
    getDoctorById: builder.query<any, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: 'GET',
      }),
      providesTags: ["Doctor"], 
    }),

    // Get doctor detail
    getDoctorDetail: builder.query<any, void>({
      query: () => ({
        url: '/doctors/me',
        method: 'GET',
      }),
      providesTags: ["Doctor"], 
    }),
    
  }),
});

export const {
  useGetDoctorsQuery,
  useLoginDoctorMutation,
  useRegisterDoctorMutation,
  useDeleteDoctorMutation,
  useGetDoctorByIdQuery,
  useGetDoctorDetailQuery,
} = doctorApi;
