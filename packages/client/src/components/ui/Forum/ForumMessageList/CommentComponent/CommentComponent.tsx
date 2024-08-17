import dayjs from 'dayjs'
import { FC } from 'react'
import { useCollapse } from 'react-collapsed'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, List, Typography } from 'antd'

import { useTranslation } from 'react-i18next'
import { SERVER_HOST } from '@/constants/serverHost'
import { Comment } from '@/types/forum'
import styles from './CommentComponent.module.scss'

interface CommentComponentProps {
  comment: Comment
  onReplyClick: (comment: Comment) => void
}
export const CommentComponent: FC<CommentComponentProps> = ({ comment, onReplyClick }) => {
  const { t } = useTranslation()
  const { text, user, createdAt, replies, parentId } = comment
  const userName = user.display_name || user.first_name
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  const showCollapseButton = !!replies?.length && !parentId
  const repliesListProps = showCollapseButton ? getCollapseProps() : {}

  return (
    <li className={styles.comment}>
      <div className={styles.comment__message}>
        <Flex vertical gap={12} align='center' justify='center' className={styles.author}>
          <Avatar src={`${SERVER_HOST}/yandex/resources${user.avatar}`} alt={userName} size='large' />
          <Typography.Paragraph className={styles.author__name} type='secondary' ellipsis={{ rows: 2 }}>
            {userName}
          </Typography.Paragraph>
        </Flex>

        <Flex gap={12} align='center' className={styles.actions}>
          <Button type='link' size='small' onClick={() => onReplyClick(comment)}>
            {t('CommentComponent.replyButtonText')}
          </Button>
          {showCollapseButton && (
            <Button
              {...getToggleProps()}
              type='text'
              size='small'
              icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
              iconPosition='end'>
              {isExpanded
                ? `${t('CommentComponent.hideRepliesButtonText')}`
                : `${t('CommentComponent.showRepliesButtonText')}`}
            </Button>
          )}
        </Flex>

        <Typography.Text className={styles.text}>{text}</Typography.Text>

        <Typography.Text type='secondary' className={styles.date}>
          {dayjs(createdAt).format('DD.MM.YY HH:mm')}
        </Typography.Text>
      </div>

      {!!replies?.length && (
        <div className={styles.comment__replies}>
          <List
            {...repliesListProps}
            dataSource={replies}
            renderItem={(reply: Comment) => <CommentComponent comment={reply} onReplyClick={onReplyClick} />}
          />
        </div>
      )}
    </li>
  )
}
