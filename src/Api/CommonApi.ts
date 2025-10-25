import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commonApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    endpoints: (builder) => ({
        GetApi: builder.query({
            query: ({ url }) => ({
                url,
                method: "GET"
            })
        }),
        PostApi: builder.mutation({
            query: ({ url, data }) => ({
                url,
                method: "POST",
                body: data
            })
        }),
    })
})


export const { useGetApiQuery, usePostApiMutation } = commonApi;