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
    loginAdmin: builder.mutation<any, AdminLoginPayload>({
      query: (admin) => ({
        url: '/login/admin',
        method: 'POST',
        body: admin
      }),
  }),
  }),
});

export const {
  useLoginAdminMutation,
} = adminApi;
