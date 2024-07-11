import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        method: 'POST',
        url: '/login',
        body: { username, password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = authApi;