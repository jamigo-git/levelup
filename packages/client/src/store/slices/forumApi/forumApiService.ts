import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_HOST } from '@/constants/serverHost'
import { Comment, Topic } from '@/types/forum'
import { AddCommentRequestBody, AddTopicRequestBody, GetCommentListResponse, GetTopicListResponse } from './types'

const forumApiService = createApi({
  reducerPath: 'forum',
  tagTypes: ['Topic', 'Comment'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_HOST}/api/forum` }),
  endpoints: builder => ({
    getTopicById: builder.query<Topic, { topicId?: number | string }>({
      query: ({ topicId }) => ({
        url: `/topics/${topicId}`,
        credentials: 'include',
      }),
    }),

    getTopicList: builder.query<GetTopicListResponse, { limit: number; offset: number }>({
      query: ({ limit, offset }) => ({
        url: `/topics?limit=${limit}&offset=${offset}`,
        credentials: 'include',
      }),
      providesTags: ['Topic'],
    }),

    getCommentList: builder.query<GetCommentListResponse, { topicId: number | string; limit: number; offset: number }>({
      query: ({ topicId, limit, offset }) => ({
        url: `/comments?topicId=${topicId}&limit=${limit}&offset=${offset}`,
        credentials: 'include',
      }),
      providesTags: ['Comment'],
    }),

    addTopic: builder.mutation<Topic, { topic: AddTopicRequestBody }>({
      query: ({ topic }) => ({
        url: '/topics',
        method: 'POST',
        credentials: 'include',
        body: topic,
      }),
      invalidatesTags: ['Topic'],
    }),

    addComment: builder.mutation<Comment, { comment: AddCommentRequestBody }>({
      query: ({ comment }) => ({
        url: '/comments',
        method: 'POST',
        credentials: 'include',
        body: comment,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
})

export const {
  useGetTopicByIdQuery,
  useGetTopicListQuery,
  useGetCommentListQuery,
  useAddTopicMutation,
  useAddCommentMutation,
} = forumApiService

export default forumApiService
