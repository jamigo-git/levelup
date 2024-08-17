import axios from 'axios'
import oAuthRedirectUri from '@/constants/oAuthRedirectUri'
import { SERVER_HOST } from '@/constants/serverHost'

class OAuthService {
  private url = `${SERVER_HOST}/yandex/oauth/yandex`

  private redirectUri = import.meta.env.DEV ? 'http://localhost:3000/login' : oAuthRedirectUri

  private serviceId = ''

  private client = axios.create({
    baseURL: this.url,
    withCredentials: true,
  })

  private getOAuthProviderUri = () => {
    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${this.serviceId}&redirect_uri=${encodeURIComponent(this.redirectUri)}`
  }

  private async getOAuthServiceId() {
    try {
      const response = await this.client('/service-id', { params: { redirect_uri: this.redirectUri } })
      this.serviceId = response.data.service_id
      return { success: true }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { error: error.response.data.reason }
      }
      return { error: 'An unknown error occurred' }
    }
  }

  public async redirectToOAuth() {
    const result = await this.getOAuthServiceId()
    if (result.error) {
      return result
    }

    const providerUri = this.getOAuthProviderUri()
    window.location.href = providerUri
    return result
  }

  public async loginOAuth() {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (!code) {
      return null
    }

    try {
      const loginData = { code, redirect_uri: this.redirectUri }
      await this.client.post('', loginData)
      return { success: true }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { error: error.response.data.reason }
      }
      return { error: 'An unknown error occurred' }
    }
  }
}

const service = new OAuthService()
export default service
