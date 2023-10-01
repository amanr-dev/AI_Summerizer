import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const KEY = import.meta.env.VITE_RAPID_API_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (header) => {
      header.set("X-RapidAPI-Key", KEY);
      header.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return header;
    },
  }),

  // https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=https%3A%2F%2Fwww.jsmastery.pro%2F&length=3

  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
