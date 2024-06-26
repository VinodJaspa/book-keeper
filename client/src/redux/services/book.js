import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params) => "books",
    }),
    getBook: builder.query({
      query: (params) => `books/${params.id}`,
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: `books`,
        method: "POST",
        body: newBook,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, book }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: book,
      }),
    }),
  }),
});

export const {
  useLazyGetBooksQuery,
  useLazyGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
} = bookApi;
