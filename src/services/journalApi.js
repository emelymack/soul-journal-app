import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const dbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB

export const journalApi = createApi({
  reducerPath: "journalApi",
  baseQuery: fetchBaseQuery({baseUrl: dbBaseUrl}),
  endpoints: (builder) => ({
    getEntries: builder.query({
      query: (userId) => `entries/${userId}.json`,
      transformResponse: (response) => {
        if (!response) { return []; }
        const entriesArray = Object.keys(response).map(key => ({
          id: key,
          ...response[key]
        })).sort((a, b) => new Date(b.date) - new Date(a.date));
        return entriesArray;
      }
    })
  })
})

export const {
  useGetEntriesQuery
} = journalApi;