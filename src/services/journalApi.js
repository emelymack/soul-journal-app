import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const dbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB

const transformAndSortEntries = createSelector(
  (response) => response,
  (response) => {
    if(!response) return [];

    const entriesArray = Object.keys(response).map((key) => ({
      id: key,
      ...response[key]
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

    return entriesArray;
  }
)

export const journalApi = createApi({
  reducerPath: "journalApi",
  baseQuery: fetchBaseQuery({baseUrl: dbBaseUrl}),
  tagTypes: ['Entries'],

  endpoints: (builder) => ({
    getEntries: builder.query({
      query: (userId) => `entries/${userId}.json`,
      transformResponse: (response) => transformAndSortEntries(response),
      providesTags: ['Entries']
    }),

    getEntryById: builder.query({
      query: ({userId, entryId}) => `entries/${userId}/${entryId}.json`,
      providesTags: ['Entries']
    }),

    getCategories: builder.query({
      query: () => 'categories.json'
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
    }),
  })
})

export const {
  useGetEntriesQuery,
  useGetEntryByIdQuery,
  useGetCategoriesQuery,
  useAddEntryMutation,
  useDeleteEntryMutation
} = journalApi;

const selectEntriesResult = (userId) => journalApi.endpoints.getEntries.select(userId);
const selectCategoriesResult = journalApi.endpoints.getCategories.select();

// --- Selector para la LISTA de entradas enriquecidas ---
export const selectEnrichedEntries = (userId) => createSelector(
  [selectEntriesResult(userId), selectCategoriesResult],
  (entriesResult, categoriesResult) => {
    const entries = entriesResult?.data;
    const categories = categoriesResult?.data;

    if (!entries || !categories) return [];

    return entries.map((entry) => ({
      ...entry,
      category: categories[entry.categoryId] || null
    }));
  }
)

export const selectEnrichedEntryById = createSelector(
    selectCategoriesResult,
    (state, {userId, entryId}) => journalApi.endpoints.getEntryById.select({userId, entryId})(state),
    (state, {entryId}) => entryId,
  
  (categoriesResult, entryResult, entryId) => {
    const entry = entryResult?.data;
    const categories = categoriesResult?.data;

    if (!entry || !categories) return undefined;

    return {
      id: entryId,
      ...entry,
      category: categories[entry.categoryId] || null
    };
  }
)