import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { KrossClientOptions } from './types'
import { getHmacToken } from './utils/encryptor'

export class KrossClient {
  client: AxiosInstance
  method?: string
  refreshToken?: string
  authToken?: string
  constructor(options: KrossClientOptions) {
    this.client = axios.create(options)
    
    this.client.interceptors.request.use(
      (config) => {
        const { hmacToken, xDate } = getHmacToken(this.method as string)
        config.headers = {
          ...config.headers,
          'client-authorization': hmacToken,
          'X-Date': xDate,
        };
        if (config.url === '/auth/refresh'){
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${this.refreshToken}`,
          }
        }
        if (this.authToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${this.authToken}`,
          };
        }
        return config
      },
    )

    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalConfig = error.config
        if (originalConfig.url !== '/auth/login' && error.response) {
          // Access Token was expired
          if (error.response.status === 401) {
            this.method = 'get'
            try {
              const response = await this.getAuthToken()
              this.authToken = response.data.token
              return this.client(originalConfig)
            } catch (error) {
              return Promise.reject(error)
            }
          }
          return Promise.reject(error)
        }
        return Promise.reject(error)
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
    } catch (error) {
      console.error(error)
      return error    
    }
    return response
  }

  async getAuthToken() {
    let response
    this.method = 'get'
    try {
      response = await this.client.get(`/auth/refresh`)
    } catch (error) {
      console.error(error)
      return error
    }
    return response
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
