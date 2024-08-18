import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddTopicReactionsResponse, AddTopicReactionsRequest, GetTopicReactionsListResponse } from './types'

const topicReactionApiService = createApi({
  reducerPath: 'topicReactions',
  tagTypes: ['TopicReaction', 'MessageReaction'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/topicReactions' }),
  endpoints: builder => ({
    getTopicReactionsList: builder.query<GetTopicReactionsListResponse, { topicIds: string[] }>({
      query: ({ topicIds }) => ({
        url: `/reactions?topicIds=${topicIds}`,
        credentials: 'include',
      }),
      providesTags: ['TopicReaction'],
    }),
    addTopicReaction: builder.mutation<AddTopicReactionsResponse, { reaction: AddTopicReactionsRequest }>({
      query: ({ reaction }) => ({
        url: '/reactions',
        method: 'POST',
        credentials: 'include',
        body: reaction,
      }),
      invalidatesTags: ['TopicReaction'],
    }),
    deleteTopicReaction: builder.mutation<string, { id: string }>({
      query: ({ id }) => ({
        url: '/reactions',
        method: 'DELETE',
        credentials: 'include',
        body: id,
      }),
      invalidatesTags: ['TopicReaction'],
    }),
  }),
})

export const { useGetTopicReactionsListQuery, useAddTopicReactionMutation, useDeleteTopicReactionMutation } =
  topicReactionApiService

export default topicReactionApiService
