import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../constants/app.constants';

export const scoreApi = createApi({
    reducerPath: 'scoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        'credentials': 'include'
    }),
    tagTypes: ['score'],
    endpoints: (builder) => ({
        getScore: builder.query({
            query: () => 'score/get/all/',
            providesTags: ['score'],
        }),
        deleteScore: builder.mutation({
            query: (id) => ({
                url: `score/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['score']
        })
    })
});

export const { useGetScoreQuery, useDeleteScoreMutation } = scoreApi;