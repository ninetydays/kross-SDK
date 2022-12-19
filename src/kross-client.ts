import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createHmac } from 'crypto'
import { KrossClientOptions } from './types'

export class KrossClient {
  client: AxiosInstance
  constructor(options: KrossClientOptions) {
    console.log("See fucking options: ", options);
    this.client = axios.create(options)
    this.client.interceptors.request.use(
      (config) => {
        const { method } = config
        const date = new Date().toUTCString()
        const hashString = hmacHashString(
          options.secretKey,
          [date, method].join(' ')
        )

        config.headers = {
          ...config.headers,
          Authorization: `KROSS ${options.accessId}:${hashString}`,
          'X-Date': date,
        }
        return config
      },
      (error) => Promise.reject(error)
)
  }


  async auth(keyid: string, password: string) {
    try {
      return await this.client.post('/auth/login'), {
        data: {
          keyid,
          password,
        }
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async token() {
    try {
      return await this.client.get(`/token`);
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async refreshToken() {
    try {
      return await this.client.get(`/auth/login`);
    } catch (error) {
      console.error(error)
      return error
    }
  }

  
  get(url: string, options?: AxiosRequestConfig) {
    return this.client.get(url, options)
  }

  put(url: string, options?: AxiosRequestConfig) {
    return this.client.put(url, options)
  }

  patch(url: string, options?: AxiosRequestConfig) {
    return this.client.patch(url, options)
  }

  post(url: string, options?: AxiosRequestConfig) {
    return this.client.post(url, options)
  }

  request(options: AxiosRequestConfig) {
    return this.client.request(options)
  }
}

export const hmacHashString = (secretKey: string, message: string) => {
  const hmac = createHmac('sha256', secretKey)
  hmac.update(message)
  return hmac.digest('base64')
}
