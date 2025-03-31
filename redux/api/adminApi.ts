import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminLoginPayload } from "@/types/admin";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://healthsync-backend-bfrv.onrender.com/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
      return headers;
    },
  }),
  tagTypes: ["Admin"], 
  endpoints: (builder) => ({

    // Admin login
    loginAdmin: builder.mutation<any, AdminLoginPayload>({
      query: (admin) => ({
        url: '/login/admin',
        method: 'POST',
        body: admin,
      }),
      invalidatesTags: ["Admin"], 
    }),

    // Get all patients (paginated)
    getAllPatients: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/patients?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ["Admin"], 
    }),

    // Get all doctors (paginated)
    getAllDoctors: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/doctors?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ["Admin"], 
    }),

  }),
});

export const {
  useLoginAdminMutation,
  useGetAllPatientsQuery,
  useGetAllDoctorsQuery,
} = adminApi;
