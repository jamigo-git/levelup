import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../..'
import { selectTopicMessages } from '../forumTopic/forumTopicSelector'

export const selectForumMessageModule = (state: RootState) => state.forumMessage

export const selectMessagesByIdList = createSelector(
  [selectForumMessageModule, selectTopicMessages],
  (messages, idList) => idList?.map(id => messages.byId[id] || null)
)
