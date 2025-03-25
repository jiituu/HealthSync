import { DoctorModel } from "@/components/models/doctor";
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

    // to login a doctor
    loginDoctor: builder.mutation<any, DoctorLoginPayload>({
        query: (doctor) => ({
          url: '/login/doctor',
          method: 'POST',
          body: doctor
        }),
    }),

    // to register a doctor
    registerDoctor: builder.mutation<any, DoctorSignupPayload>({
      query: (doctor) => ({
      url: '/register/doctor',
      method: 'POST',
      body: doctor
      }),
    }),


    // to get all doctors
    getDoctors: builder.query<any, void>({
        query: () => ({
          url: '/doctors',
          method: 'GET',
        }),
      }),

    // to delete a doctor
    deleteDoctor: builder.mutation<void, void>({
      query: () => ({
      url: '/doctors/me',
      method: 'DELETE',
      }),
    }),

    getVerifiedDoctors: builder.query<DoctorModel[], void>({
      query: () => ({
        url: '/doctors', // change the url to verified doctors and remove the comment
        method: 'GET',
      }),
    }),

    // to get a doctor by id
    getDoctorById: builder.query<any, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: 'GET',
      }),
    }),
    
  
  }),
});

export const {
  useGetDoctorsQuery,
  useLoginDoctorMutation,
  useRegisterDoctorMutation,
  useGetVerifiedDoctorsQuery ,useDeleteDoctorMutation
} = doctorApi;
