import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { KrossClientOptions } from './types'
import { getHmacToken } from './encryptor'

export class KrossClient {
  client: AxiosInstance
  method?: string
  refresh?: string
  authToken?: string
  constructor(options: KrossClientOptions) {
    this.client = axios.create(options)
    this.client.interceptors.request.use(
      (config) => {
        console.log('Config header: ', config)
        const { hmacToken, xDate } = getHmacToken(this.method as string)
        config.url !== '/auth/login'
          ? (config.headers = {
              ...config.headers,
              'client-authorization': hmacToken,
              'X-Date': xDate,
              authorization: `Bearer ${this.authToken}`,
            })
          : (config.headers = {
              ...config.headers,
              'client-authorization': hmacToken,
              'X-Date': xDate,
            })
        return config
      },
      (error) => Promise.reject(error)
    )

    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalConfig = error.config

        if (originalConfig.url !== '/auth/login' && error.response) {
          // Access Token was expired
          if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true
            this.method = 'get'
            try {
              const response = await this.client.get(`/auth/refresh`)
              this.authToken = response.data
              return this.client(originalConfig)
            } catch (error) {
              return Promise.reject(error)
            }
          }
          return Promise.reject(error)
        }
      }
    )
  }

  async login(keyid: string, password: string) {
    let response
    this.method = 'post'
    try {
      response = await this.client.post('/auth/login', {
        keyid,
        password,
      })
      let { tokenAuth } = response.data
      this.authToken = tokenAuth
    } catch (error) {
      console.error(error)
      return error
    }
    return response.data
  }

  async getAuthToken() {
    this.method = 'get'
    let response
    try {
      response = await this.client.get(`/auth/refresh`)
    } catch (error) {
      console.error(error)
      return error
    }
    return response.data
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
