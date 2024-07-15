import dayjs from 'dayjs'
import { Topic } from '@/types/forum'

export const getTopicDescription = (topic: Topic) => {
  const author = topic.author.display_name
  const date = dayjs(topic.createdAt).format('DD MMMM HH:mm')
  const messageCount = `сообщений: ${topic.messageIds.length}`
  return `${author} | ${date} | ${messageCount}`
}
