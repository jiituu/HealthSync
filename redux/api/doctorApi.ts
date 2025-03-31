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

    getVerifiedDoctors: builder.query<any, void>({
      query: () => ({
        url: '/doctors', // change the url to verified doctors and remove the comment
        method: 'GET',
      }),
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
  useGetVerifiedDoctorsQuery,
  useDeleteDoctorMutation,
  useGetDoctorByIdQuery,
  useGetDoctorDetailQuery,
} = doctorApi;

export const fetchDoctor = async (_id:string) => {
  try {
    // Importing store dynamically since there is circular dependency between doctorApi.ts and store.tsx 
    const storeModule = await import("../store");
    const store = storeModule.default;

    const result = await store.dispatch(doctorApi.endpoints.getDoctorById.initiate(_id));

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

export const loginDoctor = async (password:string,phone?:string,email?:string) => {
  try {
    // Importing store dynamically since there is circular dependency between doctorApi.ts and store.tsx
    const storeModule = await import("../store");
    const store = storeModule.default;

    const result = await store.dispatch(doctorApi.endpoints.loginDoctor.initiate({...(phone?{phone}:{}),password,...(email?{email}:{})}));

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
