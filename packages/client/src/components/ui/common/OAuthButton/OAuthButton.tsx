import { Button, message } from 'antd'
import yandexOauthLogo from '@/assets/yandex-oauth.svg'
import oAuthService from '@/utils/oAuthService'
import styles from './OAuthButton.module.scss'

export const OAuthButton = () => {
  const handleOAuthLogin = async () => {
    const result = await oAuthService.redirectToOAuth()
    if (result.error) {
      message.error(`Login error: ${result.error}`)
    }
  }

  return (
    <Button
      type='primary'
      size='large'
      htmlType='button'
      onClick={handleOAuthLogin}
      className={styles.button}
      aria-label='Войти с Яндекс ID'>
      <img src={yandexOauthLogo} alt='Логотип Яндекс' className={styles.yandexLogo} />
    </Button>
  )
}
