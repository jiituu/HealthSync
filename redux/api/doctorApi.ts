import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DoctorLoginPayload, DoctorSignupPayload } from "@/types/doctor";
// import { get } from "http";
import { DoctorApiResponse, DoctorsListApiResponse } from "@/types/doctor";

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
    // to login a doctor
    loginDoctor: builder.mutation<any, DoctorLoginPayload>({
      query: (doctor) => ({
        url: "/login/doctor",
        method: "POST",
        body: doctor,
      }),
    }),

    // to register a doctor
    registerDoctor: builder.mutation<any, DoctorSignupPayload>({
      query: (doctor) => ({
        url: "/register/doctor",
        method: "POST",
        body: doctor,
      }),
    }),

    // to get all doctors with optional status query param
    getDoctors: builder.query<
      DoctorsListApiResponse,
      { status?: "pending" | "approved" | "denied" }
    >({
      query: ({ status }) => ({
        url: "/doctors",
        method: "GET",
        params: status ? { status } : undefined,
      }),
      providesTags: ["Doctor"],
    }),

    // to delete a doctor
    deleteDoctor: builder.mutation<void, void>({
      query: () => ({
        url: "/doctors/me",
        method: "DELETE",
      }),
    }),

    getVerifiedDoctors: builder.query<any, void>({
      query: () => ({
        url: "/doctors", // change the url to verified doctors and remove the comment
        method: "GET",
      }),
    }),

    // to get a doctor by id
    getDoctorById: builder.query<any, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "GET",
      }),
    }),

    getCurrentDoctor: builder.query<DoctorApiResponse, void>({
      query: () => "/doctors/me",
      providesTags: ["Doctor"],
    }),

    // Visits
    getVisitsByDoctorIdApproval: builder.query<any, { id: string, approval: "Approved" | "Denied" | "Scheduled" }>({
      query: ({ id, approval }) => ({
        url: `/visits?doctor_id=${id}&approval=${approval}`,
        method: 'GET',
      }),
    }),

    approveRefuseVisit: builder.mutation<void, { visitID: string, approval: 'Approved' | 'Denied' }>({
      query: (visitPayload) => ({
        url: `/visits/${visitPayload.visitID}/approval`,
        method: 'PATCH',
        body: { approval: visitPayload.approval }
      }),
    }),

    updateVisit: builder.mutation<void, { visitID: string, body: any }>({
      query: (visitPayload) => ({
        url: `/visits/${visitPayload.visitID}`,
        method: 'PATCH',
        body: visitPayload.body
      }),
    }),

    // Patients
    getAppointedPatients: builder.query<any, string>({
      query: (id) => ({
        url: `/doctors/${id}/patients`,
        method: 'GET',
      }),
    }),



    updateDoctorStatus: builder.mutation<
      any,
      { doctorId: string; status: "approved" | "denied" }
    >({
      async queryFn(
        { doctorId, status },
        _queryApi,
        _extraOptions,
        baseQuery
      ) {
        const doctorResponse = await baseQuery({
          url: `/doctors/${doctorId}`,
          method: "GET",
        });
        if (doctorResponse.error) {
          return { error: doctorResponse.error };
        }
        const patchResponse = await baseQuery({
          url: `/doctors/${doctorId}`,
          method: "PATCH",
          body: { status },
        });
        if (patchResponse.error) {
          return { error: patchResponse.error };
        }
        return { data: patchResponse.data };
      },
      invalidatesTags: ["Doctor"],
    }),

  }),
});

export const {
  useGetDoctorsQuery,
  useLoginDoctorMutation,
  useRegisterDoctorMutation,
  useGetVerifiedDoctorsQuery,
  useDeleteDoctorMutation,
  useGetCurrentDoctorQuery,
  useGetVisitsByDoctorIdApprovalQuery,
  useApproveRefuseVisitMutation,
  useUpdateVisitMutation,
  useUpdateDoctorStatusMutation,
  useGetAppointedPatientsQuery,
  useGetDoctorByIdQuery,
} = doctorApi;

export const fetchDoctor = async (_id: string) => {
  try {
    // Importing store dynamically since there is circular dependency between doctorApi.ts and store.tsx
    const storeModule = await import("../store");
    const store = storeModule.default;

    const result = await store.dispatch(
      doctorApi.endpoints.getDoctorById.initiate(_id)
    );

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

export const loginDoctor = async (
  password: string,
  phone?: string,
  email?: string
) => {
  try {
    // Importing store dynamically since there is circular dependency between doctorApi.ts and store.tsx
    const storeModule = await import("../store");
    const store = storeModule.default;

    const result = await store.dispatch(
      doctorApi.endpoints.loginDoctor.initiate({
        ...(phone ? { phone } : {}),
        password,
        ...(email ? { email } : {}),
      })
    );

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
