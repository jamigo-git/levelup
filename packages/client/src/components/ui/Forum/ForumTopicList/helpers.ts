import dayjs from 'dayjs' // path must match with `i18n.language`
import { useTranslation } from 'react-i18next'
import { Topic } from '@/types/forum'

import('dayjs/locale/en')

export const GetTopicDescription = (topic: Topic) => {
  const { t, i18n } = useTranslation()
  dayjs.locale(i18n.language)

  const author = topic.author.display_name
  const date = dayjs(topic.createdAt).format('DD MMMM HH:mm')
  const messageCount = `${t('GetTopicDescription.message')}: ${topic.messageIds.length}`
  return `${author} | ${date} | ${messageCount}`
}
