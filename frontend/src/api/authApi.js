import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        method: 'POST',
        url: '/login',
        body: user,
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: 'signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  useLoginMutation, 
  useRegisterMutation,
} = authApi;