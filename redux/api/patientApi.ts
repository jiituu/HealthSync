import { PatientLoginPayload } from "@/types/patient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PatientSignupPayload } from "@/types/patient";
import { use } from "react";
import { VisitModel } from "@/components/models/visitModel";

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
    // POST
    loginPatient: builder.mutation<any, PatientLoginPayload>({
      query: (patient) => ({
        url: '/login/patient',
        method: 'POST',
        body: patient
      }),
    }),

    registerPatient: builder.mutation<any, PatientSignupPayload>({
      query: (patient) => ({
      url: '/register/patient',
      method: 'POST',
      body: patient
      }),
    }),

    requestVisit: builder.mutation<any,VisitModel>({
      query: (visit) => ({
        url: '/visits',
        method: 'POST',
        body: visit
        }),
    }),

    // DELETE
    deletePatient: builder.mutation<void, void>({
      query: () => ({
      url: '/patients/me',
      method: 'DELETE',
      }),
    }),

  }),
});

export const {
  useLoginPatientMutation,
  useRegisterPatientMutation,
  useDeletePatientMutation,
  useRequestVisitMutation
} = patientApi;
