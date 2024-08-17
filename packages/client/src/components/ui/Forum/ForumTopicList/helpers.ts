import dayjs from 'dayjs' // path must match with `i18n.language`
import { Topic } from '@/types/forum'

export const getTopicDescription = (topic: Topic, messagei18nString: string) => {
  const author = topic.user.display_name || topic.user.first_name
  const date = dayjs(topic.createdAt).format('DD MMMM HH:mm')
  const messageCount = `${messagei18nString}: ${topic.commentCount}`
  return `${author} | ${date} | ${messageCount}`
}
