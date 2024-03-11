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
        createScore: builder.mutation({
            query: (obj) => ({
                url: `score/create/`,
                method: 'POST',
                body: obj,
            }),
            invalidatesTags: ['score']
        }),
        deleteScore: builder.mutation({
            query: (id) => ({
                url: `score/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['score']
        }),
        updateScore: builder.mutation({
            query: (obj) => ({
                url: `score/update/${obj.id}`,
                method: 'PUT',
                body: obj.data,
            }),
            invalidatesTags: ['score']
        })
    })
});

export const { useGetScoreQuery, useCreateScoreMutation, useDeleteScoreMutation, useUpdateScoreMutation } = scoreApi;