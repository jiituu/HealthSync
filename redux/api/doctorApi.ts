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

    loginDoctor: builder.mutation<any, DoctorLoginPayload>({
        query: (doctor) => ({
          url: '/login/doctor',
          method: 'POST',
          body: doctor
        }),
    }),

    registerDoctor: builder.mutation<any, DoctorSignupPayload>({
      query: (doctor) => ({
      url: '/register/doctor',
      method: 'POST',
      body: doctor
      }),
    }),

    getDoctors: builder.query<any, void>({
        query: () => ({
          url: '/doctors',
          method: 'GET',
        }),
      }),
  
  }),
});

export const {
  useGetDoctorsQuery,
  useLoginDoctorMutation,
  useRegisterDoctorMutation
} = doctorApi;
