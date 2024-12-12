import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const endpointsApiFunc = createApi({
  reducerPath: 'endpointsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers) => {
        // we might chage how the token is handled in the future. using local storage for now
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [],
  endpoints: (builder) => ({

  }),
});

export const {} = endpointsApiFunc;
