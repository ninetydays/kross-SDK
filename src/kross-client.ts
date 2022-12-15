import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createHmac } from 'crypto'
import { queryType } from './types'
import { KrossClientOptions } from './types/index'

export class KrossClient {
  client: AxiosInstance
  constructor(options: KrossClientOptions) {
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

  async notes (query: queryType) {
    const params = {
      query,
    }
    try {
      return await this.client.get(`/notes`, {
        params,
      });
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async getVirtualAccCertificate (query: queryType) {
    const params = {
      member_no: query?.member_no,
      ...query,
    }
    try {
      return await this.client.get(`/users/account-certificate`, {
        params,
    });
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async unRegisterMember (query: queryType) {
    const params = {
      member_no: query?.member_no,
      ...query,
    }
    try {
      return await this.client.patch(`/users/welcome-unregister`, {
        params,
      });
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async releaseDepositControl(query: queryType) {
    const params = {
      member_no: query?.member_no,
      ...query,
    }
    try {
      return await this.client.patch(`/users/release-deposit`, {
        params,
      })
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async checkVirtualAccount(user_id: number, query: queryType) {
    const params = {
      member_no: query?.member_no,
      ...query,
    }
    try {
      return await this.client.get(`/users/virtual-account/${user_id}`, {
        params,
      })
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  get(url: string, options?: AxiosRequestConfig) {
    return this.client.get(url, options)
  }

  put(url: string, options?: AxiosRequestConfig) {
    return this.client.put(url, options)
  }

  patch(url: string, options?: AxiosRequestConfig){
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
