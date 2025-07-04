import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://healthsync.weytech.et/api/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({

    // Logout the current user
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),

    me: builder.query({
      query: (role:'patients'|'doctors'|'admin') => ({
        url: `/${role}/me`,
        method: "GET",
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body: { email: string; otp: string; role: "doctor" | "patient" }) => ({
        url: "/otp/verify",
        method: "POST",
        body,
      }),
    }),
    resendOtp: builder.mutation({
      query: (body: { email: string; role: "doctor" | "patient" }) => ({
        url: "/otp/resend",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLogoutMutation,
  useMeQuery,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = commonApi;

export const fetchMe = async (role:'patients'|'doctors'|'admin') => {
  try {
    // Importing store dynamically since there is circular dependency between doctorApi.ts and store.tsx 
    const storeModule = await import("../store");
    const store = storeModule.default;

    const result = await store.dispatch(commonApi.endpoints.me.initiate(role));

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
