import dayjs from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { Avatar, Flex, List, Typography } from 'antd'
import { useAppSelector } from '@/hooks/reduxHooks'
import { selectMessagesByIdList } from '@/store/slices/forumMessage/forumMessageSelector'
import { useTranslation } from 'react-i18next'
import { Message } from '@/types/forum'
import styles from './ForumMessageList.module.scss'

const PAGE_SIZE = 10

interface ForumMessageListProps {
  topicId: string
}
export const ForumMessageList: FC<ForumMessageListProps> = ({ topicId }) => {
  const [page, setPage] = useState(1)
  const messageList = useAppSelector(state => selectMessagesByIdList(state, topicId))
  const { t, i18n } = useTranslation()
  dayjs.locale(i18n.language)

  useEffect(() => {
    if (messageList?.length && page * PAGE_SIZE < messageList.length) {
      setPage(page + 1)
    }
  }, [messageList?.length, page])

  return (
    <List
      className={styles.list}
      dataSource={messageList}
      pagination={{
        pageSize: PAGE_SIZE,
        hideOnSinglePage: true,
        current: page,
        onChange: setPage,
      }}
      locale={{ emptyText: `${t('ForumMessageList.emptyText')}` }}
      renderItem={(message: Message) => (
        <List.Item>
          <div className={styles.message}>
            <Flex vertical gap={12} align='center' justify='center' className={styles.author}>
              <Avatar src={message.author.avatar} alt={message.author.display_name} size='large' />
              <Typography.Paragraph className={styles.author__name} type='secondary' ellipsis={{ rows: 2 }}>
                {message.author.display_name}
              </Typography.Paragraph>
            </Flex>
            <Typography.Text className={styles.text}>{message.text}</Typography.Text>
            <Typography.Text type='secondary' className={styles.date}>
              {dayjs(message.createdAt).format('DD MMMM HH:mm')}
            </Typography.Text>
          </div>
        </List.Item>
      )}
    />
  )
}
