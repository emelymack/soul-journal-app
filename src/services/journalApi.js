import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const dbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB

export const journalApi = createApi({
  reducerPath: "journalApi",
  baseQuery: fetchBaseQuery({baseUrl: dbBaseUrl}),
  tagTypes: ['Entries'],

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
      },
      providesTags: ['Entries']
    }),

    getEntryById: builder.query({
      query: ({userId, entryId}) => `entries/${userId}/${entryId}.json`,
      providesTags: ['Entries']
    }),


    addEntry: builder.mutation({
      query: ({userId, entryData}) => ({
        url: `entries/${userId}.json`,
        method: 'POST',
        body: entryData
      }),
      invalidatesTags: ['Entries']
    }),

    deleteEntry: builder.mutation({
      query: ({userId, entryId}) => ({
        url: `entries/${userId}/${entryId}.json`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Entries']
    })
  })
})

export const {
  useGetEntriesQuery,
  useGetEntryByIdQuery,
  useAddEntryMutation,
  useDeleteEntryMutation
} = journalApi;