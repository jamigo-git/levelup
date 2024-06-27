import { createSelector } from '@reduxjs/toolkit'
import { Topic } from '@/types/forum'
import { RootState } from '../..'

export const selectForumTopicModule = (state: RootState) => state.forumTopic

export const selectTopicById = (state: RootState, id?: string): Topic | null => {
  if (!id) return null
  return selectForumTopicModule(state).byId[id] || null
}

export const selectTopicMessages = (state: RootState, topicId: string): string[] | null => {
  return selectForumTopicModule(state).byId[topicId].messageIds || null
}

export const selectTopicList = createSelector([selectForumTopicModule], topics =>
  topics.idList.map(id => topics.byId[id])
)
