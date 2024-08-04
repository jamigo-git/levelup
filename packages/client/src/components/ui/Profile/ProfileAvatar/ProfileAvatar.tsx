import React, { useState } from 'react'
import { Upload, Avatar, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { editProfileAvatar } from '@/store/slices/user/userSlice'
import host from '@/constants/host'
import { useTranslation } from 'react-i18next'
import { UserAvatar } from '@/types/UserTypes'
import styles from './ProfileAvatar.module.scss'

type Props = {
  avatar: UserAvatar
  isEdit: boolean
  disabled?: boolean
}

export const ProfileAvatar: React.FC<Props> = ({ avatar, isEdit, disabled }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(avatar)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const changeAvatar = (options: { file: string | Blob }) => {
    const formData = new FormData()
    formData.append('avatar', options.file)
    dispatch(editProfileAvatar(formData))
      .unwrap()
      .then((response: { avatar: UserAvatar } | void) => {
        if (response) {
          setAvatarUrl(response.avatar)
          message.success(t('ProfileAvatar.successMessage'))
        } else {
          message.error(t('ProfileAvatar.errorMessage'))
        }
      })
      .catch(error => {
        message.error(`${t('ProfileAvatar.errorMessage')}: ${error}`)
      })
  }

  return isEdit && !disabled ? (
    <Upload name='avatar' showUploadList={false} customRequest={changeAvatar}>
      <Avatar
        size={150}
        icon={avatarUrl ? <img src={`${host}/resources${avatarUrl}`} alt='avatar' /> : <UserOutlined />}
        className={styles.avatarEdit}
      />
    </Upload>
  ) : (
    <Avatar
      onClick={() => disabled && message.error('Извините, в данный момент невозможно изменить аватар.')}
      size={150}
      icon={avatarUrl ? <img src={`${host}/resources${avatarUrl}`} alt='avatar' /> : <UserOutlined />}
      className={styles.avatar}
    />
  )
}
