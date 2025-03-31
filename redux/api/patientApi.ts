import { PatientLoginPayload, PatientSignupPayload } from "@/types/patient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://healthsync-backend-bfrv.onrender.com/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
      return headers;
    },
  }),
  tagTypes: ["Patient"], 
  endpoints: (builder) => ({

    // Patient login
    loginPatient: builder.mutation<any, PatientLoginPayload>({
      query: (patient) => ({
        url: '/login/patient',
        method: 'POST',
        body: patient,
      }),
      invalidatesTags: ["Patient"], 
    }),

    // Patient signup
    registerPatient: builder.mutation<any, PatientSignupPayload>({
      query: (patient) => ({
        url: '/register/patient',
        method: 'POST',
        body: patient,
      }),
      invalidatesTags: ["Patient"], 
    }),

    // Patient delete
    deletePatient: builder.mutation<void, void>({
      query: () => ({
        url: '/patients/me',
        method: 'DELETE',
      }),
      invalidatesTags: ["Patient"], 
    }),

    // Get patient detail
    getPatientDetail: builder.query<any, void>({
      query: () => ({
        url: '/patients/me',
        method: 'GET',
      }),
      providesTags: ["Patient"], 
    }),

  }),
});

export const {
  useLoginPatientMutation,
  useRegisterPatientMutation,
  useDeletePatientMutation,
  useGetPatientDetailQuery,
} = patientApi;
