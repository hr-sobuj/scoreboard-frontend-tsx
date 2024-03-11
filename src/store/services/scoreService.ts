import { createApi, fetchBaseQuery, type BaseQueryFn, type EndpointBuilder, type FetchArgs, type FetchBaseQueryError, type FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { baseUrl, getScoreUrl } from '../../constants/app.constants'

export const scoreApi = createApi({
    reducerPath: 'scoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder:EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "scoreApi">) => ({
        getScore:builder.query({
            query:()=>getScoreUrl,
        }),
    })
});

export const { useGetScore } = scoreApi;