import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
        },
      }),
    }),
    updateDetails: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation ,useUpdateDetailsMutation} = authApi;
