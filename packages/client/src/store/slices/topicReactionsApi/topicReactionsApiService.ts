import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_HOST } from '@/constants/serverHost'
import { AddTopicReactionsResponse, AddTopicReactionsRequest, GetTopicReactionsListResponse } from './types'

const topicReactionApiService = createApi({
  reducerPath: 'topicReactions',
  tagTypes: ['TopicReaction', 'MessageReaction'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_HOST}/api/topicReactions` }),
  endpoints: builder => ({
    getTopicReactionsList: builder.query<GetTopicReactionsListResponse, { topicIds: number[] }>({
      query: ({ topicIds }) => ({
        url: `?topicIds=${topicIds}`,
        credentials: 'include',
      }),
      providesTags: ['TopicReaction'],
    }),
    addTopicReaction: builder.mutation<AddTopicReactionsResponse, { reaction: AddTopicReactionsRequest }>({
      query: ({ reaction }) => ({
        url: '',
        method: 'POST',
        credentials: 'include',
        body: reaction,
      }),
      invalidatesTags: ['TopicReaction'],
    }),
    deleteTopicReaction: builder.mutation<string, { id: number }>({
      query: ({ id }) => ({
        url: '',
        method: 'DELETE',
        credentials: 'include',
        body: { id },
      }),
      invalidatesTags: ['TopicReaction'],
    }),
  }),
})

export const { useGetTopicReactionsListQuery, useAddTopicReactionMutation, useDeleteTopicReactionMutation } =
  topicReactionApiService

export default topicReactionApiService
