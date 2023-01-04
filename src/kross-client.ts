import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { KrossClientOptions } from './types'
import { getHmacToken } from './utils/encryptor'

export class KrossClient {
  client: AxiosInstance
  refreshToken?: string
  authToken?: string

  constructor(options: KrossClientOptions) {
    this.client = axios.create(options)

    this.client.interceptors.request.use((config) => {
      const { hmacToken, xDate } = getHmacToken(config.method as string)
      config.headers = {
        ...config.headers,
        'client-authorization': hmacToken,
        'X-Date': xDate,
      }

      if (this.authToken && config.url != '/auth/refresh') {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${this.authToken}`,
        }
      }
      return config
    })

    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalConfig = error.config
        if (originalConfig.url !== '/auth/login' && error.response) {
          // Access Token was expired
          if (error.response.status === 401) {
            const response = await this.getAuthToken()
            this.authToken = response.data.token
            return this.client(originalConfig)
          }
        }
        return Promise.reject(error)
      }
    )
  }

  async login(keyid: string, password: string) {
    let response
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
    return this.client.get<{ token: string }>(`/auth/refresh`, {
      headers: {
        authorization: `Bearer ${this.refreshToken}`,
      },
    })
  }

  get<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, options)
  }

  put<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, options)
  }

  patch<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, options)
  }

  post<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, options)
  }

  request<T = unknown>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.request<T>(options)
  }
}
