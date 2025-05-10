import { PatientLoginPayload } from "@/types/patient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PatientSignupPayload } from "@/types/patient";
import { VisitModel } from "@/components/models/visitModel";
import { use } from "react";

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

    // to get a patient by id
    getPatientById: builder.query<any, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: 'GET',
      }),
    }),

    // Visits
    getVisitsByDoctorIdPatientId: builder.query<any, {doctor_id:string,patient_id:string }>({
      query: ({doctor_id,patient_id}) => ({
        url: `/visits?doctor_id=${doctor_id}&patient_id=${patient_id}`,
        method: 'GET',
      }),
    }),

    getVisitsByPatientId: builder.query<any, {id:string}>({
      query: ({id}) => ({
        url: `/visits?patient_id=${id}`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useLoginPatientMutation,
  useRegisterPatientMutation,
  useDeletePatientMutation,
  useRequestVisitMutation,
  useGetPatientByIdQuery,
  useGetVisitsByDoctorIdPatientIdQuery,
  useGetVisitsByPatientIdQuery,
  useLazyGetPatientByIdQuery,
} = patientApi;

export const fetchPatient = async (_id:string) => {
  try {
    // Importing store dynamically since there is circular dependency between patientApi.ts and store.tsx
    const storeModule = await import("../store");
    const store = storeModule.default;

    const result = await store.dispatch(patientApi.endpoints.getPatientById.initiate(_id));

    if ("error" in result) {
      console.error("Error fetching doctors:", result.error);
      return null;
    }

    return result.data; // Returns the fetched doctors
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const loginPatient = async (password:string,phone?:string,email?:string) => {
  try {
    // Importing store dynamically since there is circular dependency between patientApi.ts and store.tsx
    const storeModule = await import("../store");
    const store = storeModule.default;

    const result = await store.dispatch(patientApi.endpoints.loginPatient.initiate({...(phone?{phone}:{}),password,...(email?{email}:{})}));

    if ("error" in result) {
      console.error("Error fetching doctors:", result.error);
      return null;
    }

    return result.data; // Returns the fetched doctors
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};
