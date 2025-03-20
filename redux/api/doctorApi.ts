import { DoctorModel } from "@/components/models/doctor";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://healthsync-backend-bfrv.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", `application/json`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    //GET
    getDoctors: builder.query<DoctorModel[], void>({
        query: () => ({
          url: '/doctors',
          method: 'GET',
        }),
    }),

    getVerifiedDoctors: builder.query<DoctorModel[], void>({
      query: () => ({
        url: '/doctors', // change the url to verified doctors and remove the comment
        method: 'GET',
      }),
    }),
  
    //POST
    addDoctor: builder.mutation<any, any>({
      query: (doctor) => ({
        url: '/doctors',
        method: 'POST',
        body: doctor
      }),
    }),
  }),
});

export const {useGetDoctorsQuery, useGetVerifiedDoctorsQuery ,useAddDoctorMutation} = doctorApi;
