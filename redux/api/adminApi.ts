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

    // for admin to login
    loginAdmin: builder.mutation<any, AdminLoginPayload>({
      query: (admin) => ({
        url: '/login/admin',
        method: 'POST',
        body: admin
      }),
  }),

  // for admin to get all the patients. it is paginated
  getAllPatients: builder.query<any, {page:number,limit:number}>({
    query: ({page,limit}) => ({
      url: `/patients?page=${page}&limit=${limit}`,
      method: 'GET' 
    }),     
  }),

  // for admin to get all the doctors. it is paginated
  getAllDoctors: builder.query<any, {page:number,limit:number}>({
    query: ({page,limit}) => ({
      url: `/doctors?page=${page}&limit=${limit}`,
      method: 'GET' 
    })      
  })



  }),
});

export const {
  useLoginAdminMutation,
  useGetAllPatientsQuery
} = adminApi;
